using AutoMapper;
using Contracts.RoomTypeDTOs;
using Contracts.SeasonalPricingDTOs;
using Domain.Exceptions.PropertyExceptions;
using Domain.Exceptions.RoomTypeExceptions;
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

        public async Task<DisplayRoomTypeDTO> CreateRoomType(NewRoomTypeDTO newRoomTypeDTO)
        {
            Property property = await _unitOfWork.Properties.Find(newRoomTypeDTO.PropertyId);
            if (property == null)
            {
                throw new PropertyNotFoundException(newRoomTypeDTO.PropertyId);
            }

            ValidateNewRoomType(newRoomTypeDTO);

            RoomType roomType = _mapper.Map<RoomType>(newRoomTypeDTO);
            roomType.Rooms = new List<Room>();

            for (int i = 0; i < newRoomTypeDTO.AmountOfRooms; i++)
            {
                roomType.Rooms.Add(new Room() { PropertyId = roomType.PropertyId });
            }

            await _unitOfWork.RoomTypes.Add(roomType);
            await _unitOfWork.Save();

            return _mapper.Map<DisplayRoomTypeDTO>(roomType);
        }

        // Validations
        private void ValidateNewRoomType(NewRoomTypeDTO newRoomTypeDTO)
        {
            ValidateAmountOfRooms(newRoomTypeDTO.AmountOfRooms);
            ValidateAmountOfPeople(newRoomTypeDTO.Adults, newRoomTypeDTO.Children);
            ValidateSeasonalPricings(newRoomTypeDTO.SeasonalPricing);
        }
        private void ValidateAmountOfRooms(int rooms)
        {
            if (rooms <= 0) 
            {
                throw new InvalidAmountOfRoomsException();
            }
        }

        private void ValidateAmountOfPeople(int adults, int children)
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

        private void ValidateSeasonalPricings(List<NewSeasonalPricingDTO> pricings)
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
