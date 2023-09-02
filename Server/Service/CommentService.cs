using Domain.Models;
using Contracts.CommentDTOs;
using Domain.Interfaces.Services;
using Domain.Interfaces.Repositories;
using AutoMapper;

namespace Service
{
    public class CommentService : ICommentsService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CommentService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<DisplayCommentDTO>> GetAccommodationComments(Guid accommodationId)
        {
            List<Comment> comments = await _unitOfWork.Comments.GetAccommodationComments(accommodationId);
            return _mapper.Map<List<DisplayCommentDTO>>(comments);
        }

        public async Task<List<DisplayCommentDTO>> GetUserComments(Guid userId)
        {
            List<Comment> comments = await _unitOfWork.Comments.GetUserComments(userId);
            List<DisplayCommentDTO> displayCommentDTOs =_mapper.Map<List<DisplayCommentDTO>>(comments);

            foreach (DisplayCommentDTO comment in displayCommentDTOs)
            {

            }
        }
    }
}
