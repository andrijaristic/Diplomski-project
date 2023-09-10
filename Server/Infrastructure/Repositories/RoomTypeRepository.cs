using Domain.Interfaces.Repositories;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class RoomTypeRepository : GenericRepository<RoomType>, IRoomTypeRepository
    {
        public RoomTypeRepository(ProjectDbContext _dbContext) : base(_dbContext)
        {

        }

        public async Task<List<RoomType>> FindRoomTypesForAccommodation(Guid accommodationId)
        {
            List<RoomType> roomTypes = await _dbContext
                                                    .RoomTypes
                                                    .AsNoTracking()
                                                    .Where(rt => rt.AccommodationId == accommodationId)
                                                    .Include(rt => rt.Accommodation)
                                                    .Include(rt => rt.SeasonalPricing)
                                                    .ToListAsync();

            return roomTypes;
        }

        public async Task<RoomType> FindDetailedRoomType(Guid id)
        {
            RoomType roomType = await _dbContext
                                            .RoomTypes
                                            .Where(rt => rt.Id == id)
                                            .Include(sp => sp.SeasonalPricing)
                                            .Include(r => r.Rooms)
                                            .Include(p => p.Accommodation)
                                            .FirstOrDefaultAsync();
            return roomType;
        }
    }
}
