using Domain.Exceptions.Common;

namespace Domain.Exceptions.UserExceptions
{
    public class UserUsernameExistsException : BadRequestException
    {
        public UserUsernameExistsException() : base($"Username already exists.") { }
    }
}
