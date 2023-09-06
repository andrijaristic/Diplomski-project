using Contracts.CommentDTOs;
using Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.API.Controllers
{
    [Route("api/comments")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentsService _commentsService;
        public CommentsController(ICommentsService commentsService)
        {
            _commentsService = commentsService;
        }

        [HttpGet("user/{id}")]
        [Authorize]
        public async Task<IActionResult> GetUserComments(Guid id) 
        {
            List<DisplayCommentDTO> displayCommentDTOs = await _commentsService.GetUserComments(id);
            return Ok(displayCommentDTOs);
        }

        [HttpGet("accommodation/{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetAccommodationComments(Guid id) 
        {
            List<DisplayCommentDTO> displayCommentDTOs = await _commentsService.GetAccommodationComments(id);
            return Ok(displayCommentDTOs); 
        }
    }
}
