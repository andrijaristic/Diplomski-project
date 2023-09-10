using Domain.Models;

namespace Domain.Interfaces.Repositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
        Task<User> FindByUsername(string username);
        Task<List<User>> GetUnverifiedUsers();
    }
}
