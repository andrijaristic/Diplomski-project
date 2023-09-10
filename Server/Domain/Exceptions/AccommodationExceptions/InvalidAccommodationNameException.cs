using Domain.Exceptions.Common;

namespace Domain.Exceptions.AccommodationExceptions
{
    public class InvalidAccommodationNameException : BadRequestException
    {
        public InvalidAccommodationNameException(string name) : base($"{name} is an invalid accommodation name.") 
        {
        
        }
    }
}
