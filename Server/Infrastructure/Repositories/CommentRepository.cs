﻿using Domain.Interfaces.Repositories;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class CommentRepository : GenericRepository<Comment>, ICommentRepository
    {
        public CommentRepository(ProjectDbContext _dbContext) : base(_dbContext)
        {

        }

        public async Task<bool> CheckIfCommentByUserForAccommodationExists(Guid accommodationId, Guid userId)
        {
            bool exists = await _dbContext
                                    .Comments
                                    .AsNoTracking()
                                    .Where(x => x.UserId == userId &&
                                                x.AccommodationId == accommodationId)
                                    .FirstOrDefaultAsync() != null;

            return exists;
        }

        public async Task<List<Comment>> GetAccommodationComments(Guid accommodationId)
        {
            List<Comment> comments = await _dbContext
                                                .Comments
                                                .AsNoTracking()
                                                .Where(x => x.AccommodationId == accommodationId)
                                                .ToListAsync();
            return comments;
        }

        public async Task<List<Comment>> GetUserComments(Guid userId)
        {
            List<Comment> comments = await _dbContext
                                                .Comments
                                                .AsNoTracking()
                                                .Where(x => x.UserId == userId)
                                                .Include(x => x.Accommodation)
                                                .ToListAsync();
            return comments;
        }
    }
}
