using AutoMapper;
using Contracts.RoomDTOs;
using Domain.Models;

namespace Service.Mapping
{
    public class RoomMappingProfile : Profile   
    {
        public RoomMappingProfile() 
        {
            CreateMap<DisplayRoomDTO, Room>().ReverseMap();
        }
    }
}
