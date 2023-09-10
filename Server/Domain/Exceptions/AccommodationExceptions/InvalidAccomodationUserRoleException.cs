using Domain.Exceptions.Common;

namespace Domain.Exceptions.AccommodationExceptions
{
    public class InvalidAccomodationUserRoleException : BadRequestException
    {
        public InvalidAccomodationUserRoleException() : base("User is not an OWNER.")
        {

        }
    }
}
