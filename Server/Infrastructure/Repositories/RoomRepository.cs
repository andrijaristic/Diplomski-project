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
    public class RoomRepository : GenericRepository<Room>, IRoomRepository
    {
        public RoomRepository(ProjectDbContext _dbContext) : base(_dbContext)
        {

        }

        public async Task<Room> FindByIdAndProperty(Guid roomId, Guid propertyId)
        {
            Room room = await _dbContext.Rooms.Where(r => r.Id == roomId && r.PropertyId == propertyId)
                                              .Include(r => r.RoomType)
                                              .ThenInclude(rt => rt.SeasonalPricing)
                                              .FirstOrDefaultAsync();
            return room;
        }

        public async Task<Room> FindDetailedRoom(Guid id)
        {
            Room room = await _dbContext.Rooms.Where(r => r.Id == id)
                                              .Include(r => r.Reservations)
                                              .Include(p => p.Property)
                                              .ThenInclude(u => u.User)
                                              .FirstOrDefaultAsync();
            return room;
        }
    }
}
