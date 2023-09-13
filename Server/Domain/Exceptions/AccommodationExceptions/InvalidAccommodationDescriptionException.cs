using Domain.Exceptions.Common;

namespace Domain.Exceptions.AccommodationExceptions
{
    public class InvalidAccommodationDescriptionException : BadRequestException
    {
        public InvalidAccommodationDescriptionException(string description) : base($"{description} is an invalid accommodation description.") 
        {
        
        }
    }
}
