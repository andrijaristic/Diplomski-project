using Domain.Interfaces.Repositories;
using Domain.Models;
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
    }
}
