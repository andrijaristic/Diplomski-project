using AutoMapper;
using Contracts.AccommodationImageDTOs;
using Domain.Models;

namespace Service.Mapping
{
    public class AccommodationImageMappingProfile : Profile
    {
        public AccommodationImageMappingProfile(string defaultImagePath)
        {
            CreateMap<AccommodationImage, AccommodationImageDTO>().ForMember(
                dest => dest.ImageURL,
                opt => opt.MapFrom(src => src.ImageURL.StartsWith("https://") ?
                                                                    src.ImageURL :
                                                                    defaultImagePath + src.ImageURL)).ReverseMap();
        }
    }
}
