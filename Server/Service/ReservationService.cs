using AutoMapper;
using Contracts.ReservationDTOs;
using Domain.Models;
using Domain.Exceptions.PropertyExceptions;
using Domain.Exceptions.ReservationExceptions;
using Domain.Exceptions.RoomExceptions;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Contracts.CommentDTOs;
using Contracts.RoomDTOs;

namespace Service
{
    public class ReservationService : IReservationsService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ReservationService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<DisplayReservationDTO>> GetReservations(Guid id)
        {
            List<Reservation> reservations = await _unitOfWork
                                                        .Reservations
                                                        .FindUserReservations(id);
            List<DisplayReservationDTO> displayReservationDTOs = _mapper.Map<List<DisplayReservationDTO>>(reservations);

            foreach (var displayReservationDTO in displayReservationDTOs)
            {
                Accommodation property = await _unitOfWork
                                                .Properties
                                                .Find(displayReservationDTO.PropertyId);
                if (property is null)
                {
                    throw new PropertyNotFoundException(displayReservationDTO.PropertyId);
                }

                displayReservationDTO.PropertyName = property.Name;
            }

            return displayReservationDTOs;
        }

        public async Task<DisplayReservationDTO> CreateReservation(NewReservationDTO newReservationDTO, bool online)
        {
            bool propertyExists = await _unitOfWork
                                            .Properties
                                            .Find(newReservationDTO.PropertyId) != null;
            if (!propertyExists) 
            {
                throw new PropertyNotFoundException(newReservationDTO.PropertyId);
            }

            Room room = await _unitOfWork
                                    .Rooms
                                    .FindByIdAndProperty(newReservationDTO.RoomId, 
                                                        newReservationDTO.PropertyId);
            if (room is null)
            {
                throw new RoomForPropertyNotFoundException();
            }

            ValidateDates(newReservationDTO.ArrivalDate, newReservationDTO.DepartureDate);

            int days = (newReservationDTO.DepartureDate - newReservationDTO.ArrivalDate).Days;
            List<ReservedDays> reservedDays = room
                                                .OccupiedDates
                                                .Where(x => newReservationDTO.ArrivalDate < x.DepartureDate &&
                                                            x.ArrivalDate < newReservationDTO.DepartureDate)
                                                .ToList();
            if (reservedDays.Count > 0)
            {
                throw new RoomAlreadyOccupiedException();
            }

            SeasonalPricing pricing = room
                                        .RoomType
                                        .SeasonalPricing
                                        .Where(sp => sp.StartDate.Month == newReservationDTO.ArrivalDate.Month)
                                        .First();
            double price = 0;
            for (var day = newReservationDTO.ArrivalDate.Date; day.Date < newReservationDTO.DepartureDate.Date; day = day.AddDays(1))
            {
                if (day.Month != pricing.StartDate.Month)
                {
                    pricing = room
                                .RoomType
                                .SeasonalPricing
                                .Where(sp => sp.StartDate.Month == day.Month)
                                .First();
                }

                price += pricing.Price;
            }

            newReservationDTO.Price = price;
            Reservation reservation = _mapper.Map<Reservation>(newReservationDTO);
            reservation.IsPayed = online;

            room.OccupiedDates.Add(
                new ReservedDays()
                {
                    ArrivalDate = newReservationDTO.ArrivalDate,
                    DepartureDate = newReservationDTO.DepartureDate
                });

            await _unitOfWork.Reservations.Add(reservation);
            await _unitOfWork.Save();

            return _mapper.Map<DisplayReservationDTO>(reservation);
        }

        public async Task<DisplayReservationDTO> CancelReservation(Guid id, string username)
        {
            Reservation reservation = await _unitOfWork
                                                .Reservations
                                                .FindByIdWithUser(id);
            if (reservation is null) 
            {
                throw new ReservationNotFoundException(id);
            }

            if (!String.Equals(reservation.User.Username, username))
            {
                throw new InvalidReservationPermissions();
            }

            if (reservation.IsCancelled)
            {
                throw new ReservationAlreadyCancelledException();
            }

            if (reservation.IsPayed)
            {
                throw new ReservationIsPaidForException();
            }

            reservation.IsCancelled = true;

            ReservedDays reservedDays = await _unitOfWork
                                                    .ReservedDays
                                                    .FindByDatesAndRoom(reservation.ArrivalDate, 
                                                                        reservation.DepartureDate,
                                                                        reservation.RoomId);
            if (reservedDays != null) 
            {
                _unitOfWork.ReservedDays.Remove(reservedDays);
            }
            await _unitOfWork.Save();

            return _mapper.Map<DisplayReservationDTO>(reservation);
        }

        // Validations
        private static void ValidateDates(DateTime arrivalDate, DateTime departureDate)
        {
            if (arrivalDate > departureDate)
            {
                throw new InvalidArrivalDateException();
            }
        }
    }
}
