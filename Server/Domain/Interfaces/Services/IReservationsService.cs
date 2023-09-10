using Contracts.ReservationDTOs;

namespace Domain.Interfaces.Services
{
    public interface IReservationsService
    {
        Task<List<DisplayReservationDTO>> GetReservations(Guid id);
        Task<DisplayReservationDTO> CreateReservation(NewReservationDTO newReservationDTO, bool online);
        Task<DisplayReservationDTO> CancelReservation(Guid id, string username);
    }
}
