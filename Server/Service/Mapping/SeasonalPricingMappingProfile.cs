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
            CreateMap<DisplaySeasonalPricingDTO, SeasonalPricing>().ReverseMap();
            CreateMap<NewSeasonalPricingDTO, SeasonalPricing>().ReverseMap();
        }
    }
}
