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
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(ProjectDbContext _dbContext) : base(_dbContext)
        {

        }

        public async Task<User> FindByUsername(string username)
        {
            User user = await _dbContext.Users.FirstOrDefaultAsync(x => String.Equals(x.Username, username));
            return user;
        }
    }
}
