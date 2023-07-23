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

        public async Task<Room> FindDetailedRoom(Guid id)
        {
            Room room = await _dbContext.Rooms.Where(r => r.Id == id)
                                              .Include(p => p.Property)
                                              .ThenInclude(u => u.User)
                                              .FirstOrDefaultAsync();
            return room;
        }
    }
}
