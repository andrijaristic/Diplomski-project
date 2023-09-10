using AutoMapper;
using Contracts.AccommodationDTOs;
using Domain.Models;

namespace Service.Mapping
{
    public class AccommodationMappingProfile : Profile
    {
        public AccommodationMappingProfile()
        {
            CreateMap<Accommodation, NewAccommodationDTO>().ForMember(dest => dest.ThumbnailImage, opt => opt.Ignore())
                                                 .ForMember(dest => dest.Utilities, opt => opt.Ignore())
                                                 .ReverseMap();
            CreateMap<Accommodation, DisplayAccommodationDTO>().ForMember(
                    dest => dest.Comments,
                    opt => opt.MapFrom(src => src.Comments.Count)).ReverseMap();
            CreateMap<Accommodation, DetailedAccommodationDTO>().ReverseMap();
            CreateMap<Accommodation, AccommodationPreviewDTO>().ReverseMap();
        }
    }
}
