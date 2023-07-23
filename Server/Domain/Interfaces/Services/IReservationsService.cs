using Contracts.ReservationDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Services
{
    public interface IReservationsService
    {
        Task<DisplayReservationDTO> CreateReservation(NewReservationDTO newReservationDTO);
    }
}
