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
    public class PropertyRepository : GenericRepository<Property>, IPropertyRepository
    {
        public PropertyRepository(ProjectDbContext _dbContext) : base(_dbContext)
        {

        }

        public async Task<Property> GetPropertyWithOwner(Guid id)
        {
            Property property = await _dbContext.Properties.Where(p => p.Id == id)
                                                           .Include(u => u.User)
                                                           .FirstOrDefaultAsync();
            return property;
        }
    }
}
