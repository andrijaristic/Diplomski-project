using AutoMapper;
using Contracts.RoomTypeDTOs;
using Domain.Models;

namespace Service.Mapping
{
    public class RoomTypeMappingProfile : Profile
    {
        public RoomTypeMappingProfile()
        {
            CreateMap<RoomType, DisplayRoomTypeDTO>().ReverseMap();
            CreateMap<RoomType, NewRoomTypeDTO>().ReverseMap();
            CreateMap<RoomType, RoomTypeMinimalDTO>().ReverseMap();
        }
    }
}
