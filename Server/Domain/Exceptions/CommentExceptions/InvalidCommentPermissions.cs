using Domain.Exceptions.Common;

namespace Domain.Exceptions.CommentExceptions
{
    public class InvalidCommentPermissions : BadRequestException
    {
        public InvalidCommentPermissions() : base("User has never completed a reservation")
        {
        }
    }
}
