using AutoMapper;
using Contracts.RoomTypeDTOs;
using Contracts.SeasonalPricingDTOs;
using Domain.Exceptions.PropertyExceptions;
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

        public async Task<List<DisplayRoomTypeDTO>> GetRoomTypesForAccommodation(Guid accommodationId, string username)
        {
            User user = await _unitOfWork
                                    .Users
                                    .FindByUsername(username);
            if (user is null)
            {
                throw new UserNotFoundException(username);
            }

            List<RoomType> roomTypes = await _unitOfWork
                                                    .RoomTypes
                                                    .FindRoomTypesForAccommodation(accommodationId, user.Id);

            return _mapper.Map<List<DisplayRoomTypeDTO>>(roomTypes);
        }

        public async Task<DisplayRoomTypeDTO> CreateRoomType(NewRoomTypeDTO newRoomTypeDTO, string username)
        {
            Property property = await _unitOfWork.Properties.Find(newRoomTypeDTO.PropertyId);
            if (property is null)
            {
                throw new PropertyNotFoundException(newRoomTypeDTO.PropertyId);
            }

            User user = await _unitOfWork.Users.FindByUsername(username);
            if (user is null)
            {
                throw new UserNotFoundException(username);
            }

            if (property.UserId != user.Id)
            {
                throw new InvalidUserInPropertyException();
            }

            ValidateNewRoomType(newRoomTypeDTO);

            RoomType roomType = _mapper.Map<RoomType>(newRoomTypeDTO);
            roomType.Rooms = new List<Room>();

            for (int i = 0; i < newRoomTypeDTO.AmountOfRooms; i++)
            {
                roomType.Rooms.Add(new Room() { PropertyId = roomType.PropertyId });
            }

            int seasonalPricingMin = roomType.SeasonalPricing.Min(x => x.Price);
            property.StartingPrice = property.StartingPrice > seasonalPricingMin ? seasonalPricingMin : 
                                                                                   property.StartingPrice;

            await _unitOfWork.RoomTypes.Add(roomType);
            await _unitOfWork.Save();

            return _mapper.Map<DisplayRoomTypeDTO>(roomType);
        }

        public async Task<DisplayRoomTypeDTO> UpdateRoomType(Guid id,UpdateRoomTypeDTO updateRoomTypeDTO, string username)
        {
            RoomType roomType = await _unitOfWork.RoomTypes.FindDetailedRoomType(id);
            if (roomType == null)
            {
                throw new RoomTypeNotFoundException(id);
            }

            if (roomType.Property == null)
            {
                throw new PropertyNotFoundException(roomType.PropertyId);
            }

            if (!String.Equals(roomType.Property.User.Username, username))
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

            return _mapper.Map<DisplayRoomTypeDTO>(roomType);
        }

        public async Task DeleteRoomType(Guid id, string username)
        {
            RoomType roomType = await _unitOfWork.RoomTypes.FindDetailedRoomType(id);
            if (roomType == null)
            {
                throw new RoomTypeNotFoundException(id);
            }

            if (roomType.Property == null)
            {
                throw new PropertyNotFoundException(roomType.PropertyId);
            }

            if (!String.Equals(roomType.Property.User.Username, username))
            {
                throw new InvalidRoomTypePermissionsException();
            }

            _unitOfWork.RoomTypes.Remove(roomType);
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

            foreach(var price in pricings)
            {
                if (price.Price <= 0)
                {
                    throw new InvalidMonthPriceException();
                }
            }
        }
    }
}
