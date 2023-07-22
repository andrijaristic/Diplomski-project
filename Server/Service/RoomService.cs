using AutoMapper;
using Domain.Models;
using Contracts.RoomDTOs;
using Domain.Interfaces.Services;
using Domain.Interfaces.Repositories;
using Domain.Exceptions.PropertyExceptions;
using Domain.Exceptions.RoomTypeExceptions;

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
    }
}
