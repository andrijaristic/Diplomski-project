using Domain.Exceptions.Common;

namespace Domain.Exceptions.CommentExceptions
{
    public class UserCommentExistsException : BadRequestException
    {
        public UserCommentExistsException() : base("User has already made comment for this accommodation")
        {
        }
    }
}
