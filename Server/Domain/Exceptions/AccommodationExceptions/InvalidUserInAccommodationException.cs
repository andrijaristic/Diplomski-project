using Domain.Exceptions.Common;

namespace Domain.Exceptions.AccommodationExceptions
{
    public class InvalidUserInAccommodationException : BadRequestException
    {
        public InvalidUserInAccommodationException() : base("You can only edit your own accommodations.") 
        {
        
        }
    }
}
