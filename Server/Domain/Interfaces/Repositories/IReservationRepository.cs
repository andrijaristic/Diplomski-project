using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    public interface IReservationRepository : IGenericRepository<Reservation>
    {
        Task<List<Reservation>> FindUserReservations(Guid id);
        Task<Reservation> FindByIdWithUser(Guid id);
        Task<Reservation> FindForUserInAccommodation(Guid userId, Guid accommodationId, DateTime date);
    }
}
