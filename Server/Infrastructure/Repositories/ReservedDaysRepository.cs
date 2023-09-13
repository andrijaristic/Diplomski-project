using Domain.Interfaces.Repositories;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ReservedDaysRepository : GenericRepository<ReservedDays>, IReservedDaysRepository
    {
        public ReservedDaysRepository(ProjectDbContext _dbContext) : base(_dbContext)
        {

        }

        public async Task<ReservedDays> FindByDatesAndRoom(DateTime arrivalDate, DateTime departureDate, Guid roomId)
        {
            ReservedDays reservedDays = await _dbContext
                                                    .ReservedDays
                                                    .Where(rd => rd.RoomId == roomId &&
                                                                 rd.ArrivalDate.Date == arrivalDate.Date &&
                                                                 rd.DepartureDate.Date == departureDate.Date)
                                                    .FirstOrDefaultAsync();
            return reservedDays;
        }
    }
}
