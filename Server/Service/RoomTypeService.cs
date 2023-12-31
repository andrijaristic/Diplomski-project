﻿using AutoMapper;
using Contracts.RoomTypeDTOs;
using Contracts.SeasonalPricingDTOs;
using Domain.Exceptions.AccommodationExceptions;
using Domain.Exceptions.RoomTypeExceptions;
using Domain.Exceptions.UserExceptions;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Domain.Models;

namespace Service
{
    public class RoomTypeService : IRoomTypeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public RoomTypeService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<DisplayRoomTypeDTO>> GetRoomTypesForAccommodation(Guid accommodationId)
        {
            List<RoomType> roomTypes = await _unitOfWork
                                                    .RoomTypes
                                                    .FindRoomTypesForAccommodation(accommodationId);

            return _mapper.Map<List<DisplayRoomTypeDTO>>(roomTypes);
        }

        public async Task<DisplayRoomTypeDTO> CreateRoomType(NewRoomTypeDTO newRoomTypeDTO, string username)
        {
            Accommodation accommodation = await _unitOfWork
                                                        .Accommodations
                                                        .Find(newRoomTypeDTO.AccommodationId);
            if (accommodation is null)
            {
                throw new AccommodationNotFoundException(newRoomTypeDTO.AccommodationId);
            }

            User user = await _unitOfWork.Users.FindByUsername(username);
            if (user is null)
            {
                throw new UserNotFoundException(username);
            }

            if (accommodation.UserId != user.Id)
            {
                throw new InvalidUserInAccommodationException();
            }

            ValidateNewRoomType(newRoomTypeDTO);

            RoomType roomType = _mapper.Map<RoomType>(newRoomTypeDTO);
            roomType.Rooms = new List<Room>();

            for (int i = 0; i < newRoomTypeDTO.AmountOfRooms; i++)
            {
                roomType.Rooms.Add(new Room() { AccommodationId = roomType.AccommodationId });
            }

            int seasonalPricingMin = roomType.SeasonalPricing.Min(x => x.Price);
            if (accommodation.StartingPrice == 0 || 
               (accommodation.StartingPrice > 0 && accommodation.StartingPrice > seasonalPricingMin))
            {
                accommodation.StartingPrice = seasonalPricingMin;
            }

            accommodation.IsVisible = true;

            await _unitOfWork.RoomTypes.Add(roomType);
            await _unitOfWork.Save();

            return _mapper.Map<DisplayRoomTypeDTO>(roomType);
        }

        public async Task<DisplayRoomTypeDTO> UpdateRoomType(Guid id, UpdateRoomTypeDTO updateRoomTypeDTO, string username)
        {
            RoomType roomType = await _unitOfWork
                                            .RoomTypes
                                            .FindDetailedRoomType(id);
            if (roomType is null)
            {
                throw new RoomTypeNotFoundException(id);
            }

            Accommodation accommodation = await _unitOfWork
                                                    .Accommodations
                                                    .Find(roomType.AccommodationId);
            if (accommodation is null)
            {
                throw new AccommodationNotFoundException(roomType.AccommodationId);
            }

            User user = await _unitOfWork
                                    .Users
                                    .FindByUsername(username);
            if (user is null)
            {
                throw new UserNotFoundException(username);
            }

            if (roomType.Accommodation.UserId != user.Id)
            {
                throw new InvalidRoomTypePermissionsException();
            }

            ValidateSeasonalPricingsUpdate(updateRoomTypeDTO.SeasonalPrices);
            for (int i = 0; i < roomType.SeasonalPricing.Count; i++)
            {
                if (roomType.SeasonalPricing[i].Id == updateRoomTypeDTO.SeasonalPrices[i].Id)
                {
                    roomType.SeasonalPricing[i].Price = updateRoomTypeDTO.SeasonalPrices[i].Price;
                }
            }

            int seasonalPricingMin = roomType.SeasonalPricing.Min(x => x.Price);
            if (accommodation.StartingPrice == 0 ||
               (accommodation.StartingPrice > 0 && accommodation.StartingPrice > seasonalPricingMin))
            {
                accommodation.StartingPrice = seasonalPricingMin;
            }

            await _unitOfWork.Save();

            return _mapper.Map<DisplayRoomTypeDTO>(roomType);
        }

        public async Task DeleteRoomType(Guid id, string username)
        {
            RoomType roomType = await _unitOfWork
                                            .RoomTypes
                                            .FindDetailedRoomType(id);
            if (roomType is null)
            {
                throw new RoomTypeNotFoundException(id);
            }

            if (roomType.Accommodation is null)
            {
                throw new AccommodationNotFoundException(roomType.AccommodationId);
            }

            User user = await _unitOfWork
                                    .Users
                                    .FindByUsername(username);
            if (user is null)
            {
                throw new UserNotFoundException(username);
            }

            if (roomType.Accommodation.UserId != user.Id)
            {
                throw new InvalidRoomTypePermissionsException();
            }

            roomType.IsDeleted = true;
            //_unitOfWork.RoomTypes.Remove(roomType);
            await _unitOfWork.Save();
        }

        // Validations
        private static void ValidateNewRoomType(NewRoomTypeDTO newRoomTypeDTO)
        {
            ValidateAmountOfRooms(newRoomTypeDTO.AmountOfRooms);
            ValidateAmountOfPeople(newRoomTypeDTO.Adults, newRoomTypeDTO.Children);
            ValidateSeasonalPricings(newRoomTypeDTO.SeasonalPricing);
        }

        private static void ValidateAmountOfRooms(int rooms)
        {
            if (rooms <= 0)
            {
                throw new InvalidAmountOfRoomsException();
            }
        }

        private static void ValidateAmountOfPeople(int adults, int children)
        {
            if (adults < 0)
            {
                throw new InvalidAdultAmountException();
            }

            if (children < 0)
            {
                throw new InvalidChildrenAmountException();
            }

            if (adults == 0 && children == 0)
            {
                throw new InvalidPeopleAmountException();
            }
        }

        private static void ValidateSeasonalPricingsUpdate(List<UpdateSeasonalPricingDTO> pricings)
        {
            if (pricings.Count != 12)
            {
                throw new InvalidMonthAmountException();
            }

            foreach (var price in pricings)
            {
                if (price.Price <= 0)
                {
                    throw new InvalidMonthPriceException();
                }
            }
        }

        private static void ValidateSeasonalPricings(List<NewSeasonalPricingDTO> pricings)
        {
            if (pricings.Count != 12)
            {
                throw new InvalidMonthAmountException();
            }

            foreach (var price in pricings)
            {
                if (price.Price <= 0)
                {
                    throw new InvalidMonthPriceException();
                }
            }
        }
    }
}
