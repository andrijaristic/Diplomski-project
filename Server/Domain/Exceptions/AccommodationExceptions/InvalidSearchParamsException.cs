using Domain.Exceptions.Common;

namespace Domain.Exceptions.PropertyExceptions
{
    public class InvalidSearchParamsException : BadRequestException
    {
        public InvalidSearchParamsException() : base("Invalid filter parameters provided. Something went wrong")
        {
        }
    }
}
