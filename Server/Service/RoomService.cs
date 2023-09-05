using AutoMapper;
using Domain.Models;
using Contracts.RoomDTOs;
using Domain.Interfaces.Services;
using Domain.Interfaces.Repositories;
using Domain.Exceptions.PropertyExceptions;
using Domain.Exceptions.RoomTypeExceptions;
using Domain.Exceptions.RoomExceptions;
using Contracts.ReservationDTOs;
using Contracts.SeasonalPricingDTOs;

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

                displayRoomBookingDTOs.Where(x => x.Id == room.Id).First().Price = price;
            }

            foreach (DisplayRoomBookingDTO dto in displayRoomBookingDTOs)
            {
                dto.RoomType.SeasonalPricing = _mapper.Map<List<SeasonalPricingMinimalDTO>>(dtoPricings);
            }

            return displayRoomBookingDTOs;
        }

        public async Task<DisplayRoomDTO> CreateRoom(NewRoomDTO newRoomDTO)
        {
            Property property = await _unitOfWork.Properties.Find(newRoomDTO.PropertyId);
            if (property == null)
            {
                throw new PropertyNotFoundException(newRoomDTO.PropertyId);
            }

            RoomType roomType = await _unitOfWork.RoomTypes.Find(newRoomDTO.RoomTypeId);
            if (roomType == null)
            {
                throw new RoomTypeNotFoundException(newRoomDTO.RoomTypeId);
            }

            Room room = _mapper.Map<Room>(newRoomDTO);

            for (int i = 0; i < newRoomDTO.AmountOfRooms; i++)
            {
                await _unitOfWork.Rooms.Add(room);
            }

            await _unitOfWork.Save();

            return _mapper.Map<DisplayRoomDTO>(room);
        }

        public async Task DeleteRoom(Guid id, string username)
        {
            Room room = await _unitOfWork.Rooms.FindDetailedRoom(id);
            if (room == null)
            {
                throw new RoomNotFoundException(id);
            }

            if (!String.Equals(room.Property.User.Username, username))
            {
                throw new InvalidRoomPermissionsExpection();
            }

            if (room.Reservations.Count > 0)
            {
                throw new RoomHasReservationsException();
            }

            _unitOfWork.Rooms.Remove(room);
            await _unitOfWork.Save();
        }

        public async Task<DisplayRoomDTO> UpdateRoom(Guid id, UpdateRoomDTO updateRoomDTO, string username)
        {
            Room room = await _unitOfWork.Rooms.FindDetailedRoom(id);
            if (room == null)
            {
                throw new RoomNotFoundException(id);
            }

            if (!String.Equals(room.Property.User.Username, username))
            {
                throw new InvalidRoomPermissionsExpection();
            }

            RoomType roomType = await _unitOfWork.RoomTypes.Find(updateRoomDTO.RoomTypeId);
            if (roomType == null)
            {
                throw new RoomTypeNotFoundException(updateRoomDTO.RoomTypeId);
            }

            room.RoomType = roomType;
            await _unitOfWork.Save();

            return _mapper.Map<DisplayRoomDTO>(room);
        }
    }
}
