using Domain.Exceptions.Common;

namespace Domain.Exceptions.UserExceptions
{
    public class InvalidRoleException : BadRequestException
    {
        public InvalidRoleException(string role) : base($"{role.ToUpper()} is invalid role.")
        {

        }
    }
}
