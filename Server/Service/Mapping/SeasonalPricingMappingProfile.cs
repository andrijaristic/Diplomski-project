using AutoMapper;
using Contracts.SeasonalPricingDTOs;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
