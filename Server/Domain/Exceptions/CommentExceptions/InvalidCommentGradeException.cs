using Domain.Exceptions.Common;

namespace Domain.Exceptions.CommentExceptions
{
    public class InvalidCommentGradeException : BadRequestException
    {
        public InvalidCommentGradeException() : base("Grade given must be between 1 and 5")
        {

        }
    }
}
