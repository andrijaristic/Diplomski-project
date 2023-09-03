﻿using AutoMapper;
using Domain.Models;
using Contracts.RoomDTOs;
using Domain.Interfaces.Services;
using Domain.Interfaces.Repositories;
using Domain.Exceptions.PropertyExceptions;
using Domain.Exceptions.RoomTypeExceptions;
using Domain.Exceptions.RoomExceptions;
using Contracts.ReservationDTOs;

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

            foreach (Room room in rooms)
            { 
                SeasonalPricing pricing = room
                                            .RoomType
                                            .SeasonalPricing
                                            .Where(sp => sp.StartDate.Month == searchRoomDTO.ArrivalDate.Month)
                                            .First();

                int days = (searchRoomDTO.DepartureDate - searchRoomDTO.ArrivalDate).Days;
                DateTime date = searchRoomDTO.ArrivalDate;
                double price = pricing.Price;
                for (int i = 0; i < days; i++)
                {
                    if (date.Month != pricing.StartDate.Month)
                    {
                        pricing = room
                                    .RoomType
                                    .SeasonalPricing
                                    .Where(sp => sp.StartDate.Month == date.Month)
                                    .First();
                    }

                    price += pricing.Price;
                    date = date.AddDays(1);
                }

                displayRoomBookingDTOs.Where(x => x.Id == room.Id).First().Price = price;
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

            await _unitOfWork.Rooms.Add(room);
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
