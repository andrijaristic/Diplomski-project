using AutoMapper;
using Contracts.ReservationDTOs;
using Domain.Models;

namespace Service.Mapping
{
    public class ReservationMappingProfile : Profile
    {
        public ReservationMappingProfile()
        {
            CreateMap<Reservation, NewReservationDTO>().ReverseMap();
            CreateMap<Reservation, DisplayReservationDTO>().ReverseMap();
        }
    }
}
