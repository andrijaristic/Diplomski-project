using Domain.Exceptions.Common;

namespace Domain.Exceptions.PropertyExceptions
{
    public class InvalidPropertyUserRoleException : BadRequestException
    {
        public InvalidPropertyUserRoleException() : base("User is not PROPERTY OWNER.")
        {

        }
    }
}
