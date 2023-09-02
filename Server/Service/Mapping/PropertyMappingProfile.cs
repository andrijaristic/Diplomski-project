using AutoMapper;
using Contracts.PropertyDTOs;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Mapping
{
    public class PropertyMappingProfile : Profile
    {
        public PropertyMappingProfile(string defaultImagePath) 
        {
            CreateMap<NewPropertyDTO, Property>().ReverseMap();
            CreateMap<DisplayPropertyDTO, Property>().ReverseMap();
            CreateMap<DetailedPropertyDTO, Property>().ForMember(
                dest => dest.ThumbnailImage,
                opt => opt.MapFrom(src => src.ThumbnailImage.StartsWith("https://") ?
                                                                    src.ThumbnailImage :
                                                                    defaultImagePath + src.ThumbnailImage))
            .ReverseMap();
        }
    }
}
