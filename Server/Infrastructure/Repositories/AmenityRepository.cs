using Domain.Interfaces.Repositories;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class AmenityRepository : GenericRepository<PropertyUtility>, IAmenityRepository
    {
        public AmenityRepository(ProjectDbContext _dbContext) : base(_dbContext) 
        {
        
        }
    }
}
