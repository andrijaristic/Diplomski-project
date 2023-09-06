using Contracts.CommentDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Services
{
    public interface ICommentsService
    {
        Task<List<DisplayCommentDTO>> GetAccommodationComments(Guid accommodationId);
        Task<List<DisplayCommentDTO>> GetUserComments(Guid userId);
    }
}
