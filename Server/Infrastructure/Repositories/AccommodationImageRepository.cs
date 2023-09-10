using Domain.Interfaces.Repositories;
using Domain.Models;

namespace Infrastructure.Repositories
{
    public class AccommodationImageRepository : GenericRepository<AccommodationImage>, IAccommodationImageRepository
    {
        public AccommodationImageRepository(ProjectDbContext dbContext) : base(dbContext)
        {
        }
    }
}
