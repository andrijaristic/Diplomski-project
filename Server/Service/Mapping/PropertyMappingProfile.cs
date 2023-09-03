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
        public PropertyMappingProfile() 
        {
            CreateMap<NewPropertyDTO, Property>().ForMember(dest => dest.ThumbnailImage, opt => opt.Ignore()).ReverseMap();
            CreateMap<Property, DisplayPropertyDTO>().ForMember(
                    dest => dest.Comments,
                    opt => opt.MapFrom(src => src.Comments.Count)).ReverseMap();
            CreateMap<DetailedPropertyDTO, Property>().ReverseMap();
            CreateMap<Property, PropertyPreviewDTO>().ReverseMap();
        }
    }
}
