using Domain.Exceptions.Common;

namespace Domain.Exceptions.AccommodationExceptions
{
    public class InvalidUserIdInNewAccommodationException : BadRequestException
    {
        public InvalidUserIdInNewAccommodationException() : base("You can only create accommodations that will belong to you.")
        {

        }
    }
}
