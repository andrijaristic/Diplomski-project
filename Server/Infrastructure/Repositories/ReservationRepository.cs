using Domain.Interfaces.Repositories;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class ReservationRepository : GenericRepository<Reservation>, IReservationRepository
    {
        public ReservationRepository(ProjectDbContext _dbContext) : base(_dbContext)
        {

        }

        public async Task<Reservation> FindByIdWithUser(Guid id)
        {
            Reservation reservation = await _dbContext.Reservations.Where(r => r.Id == id).Include(u => u.User).FirstOrDefaultAsync();
            return reservation;
        }
    }
}
