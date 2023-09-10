using AutoMapper;
using Contracts.RoomTypeDTOs;
using Domain.Models;

namespace Service.Mapping
{
    public class RoomTypeMappingProfile : Profile
    {
        public RoomTypeMappingProfile()
        {
            CreateMap<DisplayRoomTypeDTO, RoomType>().ReverseMap();
            CreateMap<NewRoomTypeDTO, RoomType>().ReverseMap();
            CreateMap<RoomType, RoomTypeMinimalDTO>().ReverseMap();
        }
    }
}
