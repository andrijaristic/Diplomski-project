using Domain.Exceptions.Common;

namespace Domain.Exceptions.UserExceptions
{
    public class InvalidExternalLoginServiceException : BadRequestException
    {
        public InvalidExternalLoginServiceException(string service) : base($"{service} is not supported external login service.")
        {

        }
    }
}
