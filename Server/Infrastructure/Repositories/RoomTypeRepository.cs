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
    public class RoomTypeRepository : GenericRepository<RoomType>, IRoomTypeRepository
    {
        public RoomTypeRepository(ProjectDbContext _dbContext) : base(_dbContext) { }

        public async Task<RoomType> FindDetailedRoomType(Guid id)
        {
            RoomType roomType = await _dbContext
                                            .RoomTypes
                                            .AsNoTracking()
                                            .Where(rt => rt.Id == id)
                                            .Include(sp => sp.SeasonalPricing)
                                            .Include(r => r.Rooms)
                                            .Include(p => p.Property)
                                            .FirstOrDefaultAsync();
            return roomType;
        }
    }
}
