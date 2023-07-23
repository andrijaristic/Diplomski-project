using AutoMapper;
using Contracts.ReservationDTOs;
using Domain.Exceptions.PropertyExceptions;
using Domain.Exceptions.ReservationExceptions;
using Domain.Exceptions.RoomExceptions;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<DisplayReservationDTO> CreateReservation(NewReservationDTO newReservationDTO)
        {
            bool propertyExists = await _unitOfWork.Properties.Find(newReservationDTO.PropertyId) != null;
            if (!propertyExists) 
            {
                throw new PropertyNotFoundException(newReservationDTO.PropertyId);
            }

            Room room = await _unitOfWork.Rooms.FindByIdAndProperty(newReservationDTO.RoomId, newReservationDTO.PropertyId);
            if (room == null)
            {
                throw new RoomForPropertyNotFoundException();
            }

            ValidateDates(newReservationDTO.ArrivalDate, newReservationDTO.DepartureDate);

            // Go through each date of the month 
            // Find pricing that matches arrivalDate
            // Iterate and with each iteration check if month is same
            // If month isn't same, find new pricing and continue iterating until departureDate (DepartureDate - ArrivalDate to get amount of iterations)

            int days = (newReservationDTO.DepartureDate - newReservationDTO.ArrivalDate).Days;
            SeasonalPricing pricing = room.RoomType.SeasonalPricing.Where(sp => sp.StartDate.Month == newReservationDTO.ArrivalDate.Month).First();
            DateTime date = newReservationDTO.ArrivalDate.AddDays(1);
            double price = pricing.Price;
            for (int i = 0; i < days; i++)
            {
                if (date.Month != pricing.StartDate.Month)
                {
                    pricing = room.RoomType.SeasonalPricing.Where(sp => sp.StartDate.Month == date.Month).First();
                }

                price += pricing.Price;
                date = date.AddDays(1);
            }

            newReservationDTO.Price = price;
            Reservation reservation = _mapper.Map<Reservation>(newReservationDTO);

            await _unitOfWork.Reservations.Add(reservation);
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
