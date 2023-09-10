using Domain.Models;

namespace Domain.Interfaces.Repositories
{
    public interface ICommentRepository : IGenericRepository<Comment>
    {
        Task<List<Comment>> GetAccommodationComments(Guid accommodationId);
        Task<List<Comment>> GetUserComments(Guid userId);
        Task<bool> CheckIfCommentByUserForAccommodationExists(Guid accommodationId, Guid UserId);
    }
}
