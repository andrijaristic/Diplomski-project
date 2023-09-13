using Domain.Models;

namespace Domain.Interfaces.Repositories
{
    public interface IReservationRepository : IGenericRepository<Reservation>
    {
        Task<List<Reservation>> FindUserReservations(Guid id);
        Task<Reservation> FindByIdWithUser(Guid id);
        Task<Reservation> FindForUserInAccommodation(Guid userId, Guid accommodationId, DateTime date);
    }
}
