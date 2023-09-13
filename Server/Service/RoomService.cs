using AutoMapper;
using Contracts.RoomDTOs;
using Contracts.SeasonalPricingDTOs;
using Domain.Exceptions.AccommodationExceptions;
using Domain.Exceptions.RoomExceptions;
using Domain.Exceptions.RoomTypeExceptions;
using Domain.Exceptions.UserExceptions;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Domain.Models;

namespace Service
{
    public class RoomService : IRoomService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public RoomService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<DisplayRoomDTO>> GetRoomsForAccommodation(Guid accommodationId, string username)
        {
            User user = await _unitOfWork
                                    .Users
                                    .FindByUsername(username);
            if (user is null)
            {
                throw new UserNotFoundException(username);
            }

            Accommodation property = await _unitOfWork
                                                .Accommodations
                                                .Find(accommodationId);
            if (property is null)
            {
                throw new AccommodationNotFoundException(accommodationId);
            }

            if (property.UserId != user.Id)
            {
                throw new InvalidUserInAccommodationException();
            }

            List<Room> rooms = await _unitOfWork
                                            .Rooms
                                            .GetForAccommodation(accommodationId, DateTime.Now.ToUniversalTime().Date);
            List<DisplayRoomDTO> displayRoomDTOs = _mapper.Map<List<DisplayRoomDTO>>(rooms);
            foreach (DisplayRoomDTO dto in displayRoomDTOs)
            {
                dto.ReservationAmount = rooms
                                            .First(x => x.Id == dto.Id)
                                            .Reservations
                                            .Count;
            }

            return displayRoomDTOs;
        }

        public async Task<List<DisplayRoomBookingDTO>> FilterRoomsForBooking(SearchRoomDTO searchRoomDTO)
        {
            if (searchRoomDTO.ArrivalDate.Date > searchRoomDTO.DepartureDate.Date)
            {
                throw new InvalidRoomSearchDatesException();
            }

            List<Room> rooms = await _unitOfWork
                                            .Rooms
                                            .FilterRooms(searchRoomDTO);
            if (rooms is null)
            {
                return new List<DisplayRoomBookingDTO>();
            }

            List<DisplayRoomBookingDTO> displayRoomBookingDTOs = _mapper.Map<List<DisplayRoomBookingDTO>>(rooms);
            foreach (DisplayRoomBookingDTO dto in displayRoomBookingDTOs)
            {
                dto.ArrivalDate = searchRoomDTO.ArrivalDate;
                dto.DepartureDate = searchRoomDTO.DepartureDate;
            }

            List<SeasonalPricing> dtoPricings = new List<SeasonalPricing>();
            foreach (Room room in rooms)
            {
                SeasonalPricing pricing = room
                                            .RoomType
                                            .SeasonalPricing
                                            .Where(sp => sp.StartDate.Month == searchRoomDTO.ArrivalDate.Month)
                                            .First();

                if (!dtoPricings.Contains(pricing))
                {
                    dtoPricings.Add(pricing);
                }

                double price = 0;
                for (var day = searchRoomDTO.ArrivalDate.Date; day.Date < searchRoomDTO.DepartureDate.Date; day = day.AddDays(1))
                {
                    if (day.Month != pricing.StartDate.Month)
                    {
                        pricing = room
                                    .RoomType
                                    .SeasonalPricing
                                    .Where(sp => sp.StartDate.Month == day.Month)
                                    .First();

                        if (!dtoPricings.Contains(pricing))
                        {
                            dtoPricings.Add(pricing);
                        }
                    }

                    price += pricing.Price;
                }

                displayRoomBookingDTOs
                                .Where(x => x.Id == room.Id)
                                .First()
                                .Price = price;
            }

            foreach (DisplayRoomBookingDTO dto in displayRoomBookingDTOs)
            {
                dto.RoomType.SeasonalPricing = _mapper.Map<List<SeasonalPricingMinimalDTO>>(dtoPricings);
            }

            return displayRoomBookingDTOs;
        }

        public async Task<DisplayRoomDTO> CreateRoom(NewRoomDTO newRoomDTO, string username)
        {
            Accommodation property = await _unitOfWork
                                                .Accommodations
                                                .Find(newRoomDTO.AmenityId);
            if (property is null)
            {
                throw new AccommodationNotFoundException(newRoomDTO.AmenityId);
            }

            User user = await _unitOfWork.Users.FindByUsername(username);
            if (user is null)
            {
                throw new UserNotFoundException(username);
            }

            if (property.UserId != user.Id)
            {
                throw new InvalidUserInAccommodationException();
            }

            RoomType roomType = await _unitOfWork
                                            .RoomTypes
                                            .Find(newRoomDTO.RoomTypeId);
            if (roomType is null)
            {
                throw new RoomTypeNotFoundException(newRoomDTO.RoomTypeId);
            }

            Room room = _mapper.Map<Room>(newRoomDTO);

            for (int i = 0; i < newRoomDTO.AmountOfRooms; i++)
            {
                await _unitOfWork.Rooms.Add(room);
            }

            property.IsVisible = true;

            await _unitOfWork.Save();

            return _mapper.Map<DisplayRoomDTO>(room);
        }

        public async Task DeleteRoom(Guid id, DeleteRoomDTO deleteRoomDTO, string username)
        {
            User user = await _unitOfWork
                                    .Users
                                    .FindByUsername(username);
            if (user is null)
            {
                throw new UserNotFoundException(username);
            }

            Room room = await _unitOfWork
                                    .Rooms
                                    .FindDetailedRoom(id,
                                                      deleteRoomDTO.AmenityId,
                                                      DateTime.Now.ToUniversalTime().Date);
            if (room is null || room.IsDeleted)
            {
                throw new RoomNotFoundException(id);
            }

            Accommodation property = await _unitOfWork
                                                .Accommodations
                                                .GetWithRooms(room.AccommodationId);
            if (property is null)
            {
                throw new AccommodationNotFoundException(room.AccommodationId);
            }

            if (property.UserId != user.Id)
            {
                throw new InvalidRoomPermissionsExpection();
            }

            if (room.Reservations.Count > 0)
            {
                throw new RoomHasReservationsException();
            }

            if (property.Rooms.Count == 1)
            {
                throw new InsufficientRoomsException();
            }

            room.IsDeleted = true;
            //_unitOfWork.Rooms.Remove(room);
            await _unitOfWork.Save();
        }

        public async Task<DisplayRoomDTO> UpdateRoom(Guid id, UpdateRoomDTO updateRoomDTO, string username)
        {
            User user = await _unitOfWork
                                    .Users
                                    .FindByUsername(username);
            if (user is null)
            {
                throw new UserNotFoundException(username);
            }

            Room room = await _unitOfWork
                                    .Rooms
                                    .FindDetailedRoom(id,
                                                      updateRoomDTO.AmenityId,
                                                      DateTime.Now.ToUniversalTime().Date);
            if (room is null)
            {
                throw new RoomNotFoundException(id);
            }

            if (room.Accommodation.UserId != user.Id)
            {
                throw new InvalidRoomPermissionsExpection();
            }

            RoomType roomType = await _unitOfWork
                                            .RoomTypes
                                            .Find(updateRoomDTO.RoomTypeId);
            if (roomType is null)
            {
                throw new RoomTypeNotFoundException(updateRoomDTO.RoomTypeId);
            }

            if (room.RoomType.Adults > roomType.Adults ||
                room.RoomType.Children > roomType.Children)
            {
                throw new InvalidRoomGuestAmountUpdateException();
            }

            room.RoomType = roomType;
            await _unitOfWork.Save();

            return _mapper.Map<DisplayRoomDTO>(room);
        }
    }
}
