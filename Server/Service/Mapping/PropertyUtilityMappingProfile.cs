using AutoMapper;
using Contracts.PropertyUtilityDTOs;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Mapping
{
    public class PropertyUtilityMappingProfile : Profile
    {
        public PropertyUtilityMappingProfile() 
        {
            CreateMap<PropertyUtility, PropertyUtilityDTO>().ReverseMap();
        }
    }
}
