using Microsoft.EntityFrameworkCore;
using Domain.Interfaces.Repositories;
using Domain.Models;

namespace Infrastructure.Repositories
{
    public class ReservationRepository : GenericRepository<Reservation>, IReservationRepository
    {
        public ReservationRepository(ProjectDbContext _dbContext) : base(_dbContext)
        {

        }

        public async Task<Reservation> FindByIdWithUser(Guid id)
        {
            Reservation reservation = await _dbContext
                                                .Reservations
                                                .Where(r => r.Id == id)
                                                .Include(u => u.User)
                                                .FirstOrDefaultAsync();
            return reservation;
        }

        public async Task<List<Reservation>> FindUserReservations(Guid userId)
        {
            List<Reservation> reservations = await _dbContext
                                                        .Reservations
                                                        .Where(r => r.UserId == userId)
                                                        .ToListAsync();
            return reservations;
        }
    }
}
