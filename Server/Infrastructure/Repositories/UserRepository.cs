using Domain.Interfaces.Repositories;
using Domain.Models;
using Microsoft.AspNetCore.Mvc.Formatters;
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
            User user = await _dbContext
                                    .Users
                                    .AsNoTracking()
                                    .FirstOrDefaultAsync(x => x.Username.Equals(username));
            return user;
        }

        public async Task<List<User>> GetUnverifiedUsers()
        {
            List<User> users = await _dbContext
                                            .Users
                                            .AsNoTracking()
                                            .Where(x => !x.IsVerified && 
                                                   x.VerificationStatus == Domain.Enums.VerificationStatus.PENDING)
                                            .ToListAsync();
            return users;
        }
    }
}
