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
        Task<List<DisplayReservationDTO>> GetReservations(Guid id);
        Task<DisplayReservationDTO> CreateReservation(NewReservationDTO newReservationDTO, bool online);
        Task<DisplayReservationDTO> CancelReservation(Guid id, string username);
    }
}
