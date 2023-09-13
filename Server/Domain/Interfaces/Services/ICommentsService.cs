using Contracts.CommentDTOs;

namespace Domain.Interfaces.Services
{
    public interface ICommentsService
    {
        Task<List<DisplayCommentDTO>> GetAccommodationComments(Guid accommodationId);
        Task<List<DisplayCommentDTO>> GetUserComments(Guid userId);
        Task<DisplayCommentDTO> CreateComment(NewCommentDTO newCommentDTO, string username);
    }
}
