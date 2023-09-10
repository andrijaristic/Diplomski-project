using Domain.Exceptions.Common;

namespace Domain.Exceptions.UserExceptions
{
    public class InvalidPasswordException : BadRequestException
    {
        public InvalidPasswordException() : base("Provided password is invalid.") { }
    }
}
