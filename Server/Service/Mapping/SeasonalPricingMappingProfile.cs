using AutoMapper;
using Contracts.SeasonalPricingDTOs;
using Domain.Models;

namespace Service.Mapping
{
    public class SeasonalPricingMappingProfile : Profile
    {
        public SeasonalPricingMappingProfile()
        {
            CreateMap<SeasonalPricing, DisplaySeasonalPricingDTO>().ReverseMap();
            CreateMap<SeasonalPricing, NewSeasonalPricingDTO>().ReverseMap();
            CreateMap<SeasonalPricing, SeasonalPricingMinimalDTO>().ReverseMap();
        }
    }
}
