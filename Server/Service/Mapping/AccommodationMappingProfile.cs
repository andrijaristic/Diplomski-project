using AutoMapper;
using Domain.Models;
using Contracts.AccommodationDTOs;

namespace Service.Mapping
{
    public class AccommodationMappingProfile : Profile
    {
        public AccommodationMappingProfile()
        {
            CreateMap<NewAccommodationDTO, Accommodation>().ForMember(dest => dest.ThumbnailImage, opt => opt.Ignore())
                                                 .ForMember(dest => dest.Amenities, opt => opt.Ignore())
                                                 .ReverseMap();
            CreateMap<Accommodation, DisplayAccommodationDTO>().ForMember(
                    dest => dest.Comments,
                    opt => opt.MapFrom(src => src.Comments.Count)).ReverseMap();
            CreateMap<Accommodation, DetailedAccommodationDTO>().ReverseMap();
            CreateMap<Accommodation, AccommodationPreviewDTO>().ReverseMap();
        }
    }
}
