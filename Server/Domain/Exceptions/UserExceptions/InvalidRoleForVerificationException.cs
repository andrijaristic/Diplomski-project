using Domain.Exceptions.Common;

namespace Domain.Exceptions.UserExceptions
{
    public class InvalidRoleForVerificationException : BadRequestException
    {
        public InvalidRoleForVerificationException(string role) : base($"{role} is not eligible for verification.")
        {

        }
    }
}
