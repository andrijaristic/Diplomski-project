using Microsoft.EntityFrameworkCore;
using Domain.Models;
using Domain.Interfaces.Repositories;

namespace Infrastructure.Repositories
{
    public class CommentRepository : GenericRepository<Comment>, ICommentRepository
    {
        public CommentRepository(ProjectDbContext _dbContext) : base(_dbContext) 
        {

        }

        public async Task<List<Comment>> GetAccommodationComments(Guid accommodationId)
        {
            List<Comment> comments = await _dbContext
                                                .Comments
                                                .AsNoTracking()
                                                .Where(x => x.PropertyId == accommodationId)
                                                .ToListAsync();
            return comments;
        }

        public async Task<List<Comment>> GetUserComments(Guid userId)
        {
            List<Comment> comments = await _dbContext
                                                .Comments
                                                .AsNoTracking()
                                                .Where(x => x.UserId == userId)
                                                .Include(x => x.Property)
                                                .ToListAsync();
            return comments;
        }
    }
}
