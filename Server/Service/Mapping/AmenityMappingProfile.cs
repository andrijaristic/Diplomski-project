using AutoMapper;
using Contracts.AmenityDTOs;
using Contracts.PropertyUtilityDTOs;
using Domain.Models;

namespace Service.Mapping
{
    public class AmenityMappingProfile : Profile
    {
        public AmenityMappingProfile()
        {
            CreateMap<Amenity, PropertyUtilityDTO>().ReverseMap();
            CreateMap<Amenity, DisplayAmenityDTO>().ReverseMap();
        }
    }
}
