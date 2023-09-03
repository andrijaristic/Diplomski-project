using AutoMapper;
using Contracts.ReservationDTOs;
using Domain.Models;

namespace Service.Mapping
{
    public class ReservationMappingProfile : Profile
    {
        public ReservationMappingProfile() 
        {
            CreateMap<NewReservationDTO, Reservation>().ReverseMap();
            CreateMap<Reservation, DisplayReservationDTO>().ReverseMap();
        }
    }
}
