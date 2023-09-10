using Domain.Interfaces.Repositories;
using Domain.Models;

namespace Infrastructure.Repositories
{
    public class AmenityRepository : GenericRepository<Amenity>, IAmenityRepository
    {
        public AmenityRepository(ProjectDbContext _dbContext) : base(_dbContext)
        {

        }
    }
}
