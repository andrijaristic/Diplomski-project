using Domain.Exceptions.Common;

namespace Domain.Exceptions.CommentExceptions
{
    public class InvalidCommentContentException : BadRequestException
    {
        public InvalidCommentContentException() : base("Comment content must not be empty")
        {

        }
    }
}
