using Domain.Interfaces.Repositories;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class PropertyUtilityRepository : GenericRepository<PropertyUtility>, IPropertyUtilityRepository
    {
        public PropertyUtilityRepository(ProjectDbContext _dbContext) : base(_dbContext) 
        {
        
        }
    }
}
