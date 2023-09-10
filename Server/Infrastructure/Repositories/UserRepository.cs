using Domain.Interfaces.Repositories;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

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
