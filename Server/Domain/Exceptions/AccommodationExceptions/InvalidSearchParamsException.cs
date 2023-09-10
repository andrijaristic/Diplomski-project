using Domain.Exceptions.Common;

namespace Domain.Exceptions.AccommodationExceptions
{
    public class InvalidSearchParamsException : BadRequestException
    {
        public InvalidSearchParamsException() : base("Invalid filter parameters provided. Something went wrong")
        {

        }
    }
}
