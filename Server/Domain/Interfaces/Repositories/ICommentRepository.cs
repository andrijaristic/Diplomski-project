using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    public interface ICommentRepository: IGenericRepository<Comment>
    {
        public Task<List<Comment>> GetAccommodationComments(Guid accommodationId);
        public Task<List<Comment>> GetUserComments(Guid userId);
    }
}
