using Domain.Exceptions.Common;

namespace Domain.Exceptions.UserExceptions
{
    public class InvalidServiceTokenException : BadRequestException
    {
        public InvalidServiceTokenException() : base("Provided external service token is invalid.") { }
    }
}
