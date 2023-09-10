using Domain.Exceptions.Common;

namespace Domain.Exceptions.CommentExceptions
{
    public class InvalidCommentHeaderException : BadRequestException
    {
        public InvalidCommentHeaderException() : base("Comment title must not be empty")
        {
        }
    }
}
