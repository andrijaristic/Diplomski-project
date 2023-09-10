using Domain.Exceptions.Common;

namespace Domain.Exceptions.UserExceptions
{
    public class UserNotFoundException : BadRequestException
    {
        public UserNotFoundException(string username) : base($"User with username {username} does not exist.") { }
    }
}
