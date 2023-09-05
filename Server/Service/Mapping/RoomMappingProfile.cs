using AutoMapper;
using Contracts.RoomDTOs;
using Domain.Models;

namespace Service.Mapping
{
    public class RoomMappingProfile : Profile   
    {
        public RoomMappingProfile() 
        {
            CreateMap<Room, DisplayRoomDTO>().ReverseMap();
            CreateMap<Room, DisplayRoomBookingDTO>().ReverseMap();
            CreateMap<Room, NewRoomDTO>().ReverseMap();
        }
    }
}
