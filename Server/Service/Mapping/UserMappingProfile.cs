using AutoMapper;
using Contracts.UserDTOs;
using Domain.Models;

namespace Service.Mapping
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<User, DisplayUserDTO>().ReverseMap();
            CreateMap<User, AuthDTO>().ReverseMap();
            CreateMap<User, DetailedUserDTO>().ReverseMap();
            CreateMap<User, NewUserDTO>().ReverseMap();
        }
    }
}
