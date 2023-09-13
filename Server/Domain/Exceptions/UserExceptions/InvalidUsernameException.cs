using Domain.Exceptions.Common;

namespace Domain.Exceptions.UserExceptions
{
    public class InvalidUsernameException : BadRequestException
    {
        public InvalidUsernameException() : base($"Provided username is invalid.") { }
    }
}
