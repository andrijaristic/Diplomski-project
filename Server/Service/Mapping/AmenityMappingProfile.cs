using AutoMapper;
using Domain.Models;
using Contracts.AmenityDTOs;

namespace Service.Mapping
{
    public class AmenityMappingProfile : Profile
    {
        public AmenityMappingProfile()
        {
            CreateMap<Amenity, AmenityDTO>().ReverseMap();
        }
    }
}
