using AutoMapper;
using Contracts.RoomDTOs;
using Contracts.RoomTypeDTOs;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Mapping
{
    public class RoomTypeMappingProfile : Profile
    {
        public RoomTypeMappingProfile() 
        {
            CreateMap<DisplayRoomTypeDTO, RoomType>().ReverseMap();
            CreateMap<NewRoomTypeDTO, RoomType>().ReverseMap();
        }
    }
}
