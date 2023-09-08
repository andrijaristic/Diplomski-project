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
                                                .Include(r => r.Room)
                                                .ThenInclude(r => r.OccupiedDates)
                                                .FirstOrDefaultAsync();
            return reservation;
        }

        public async Task<Reservation> FindForUserInAccommodation(Guid userId, Guid accommodationId, DateTime date)
        {
            Reservation reservation = await _dbContext
                                                    .Reservations
                                                    .Where(x => x.UserId == userId &&
                                                                x.PropertyId == accommodationId &&
                                                                x.DepartureDate.Date <= date.Date)
                                                    .FirstOrDefaultAsync();
            return reservation;
        }

        public async Task<List<Reservation>> FindUserReservations(Guid userId)
        {
            List<Reservation> reservations = await _dbContext
                                                        .Reservations
                                                        .AsNoTracking()
                                                        .Where(r => r.UserId == userId &&
                                                                   !r.IsCancelled)
                                                        .ToListAsync();
            return reservations;
        }
    }
}
