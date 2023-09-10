using Domain.Exceptions.Common;

namespace Domain.Exceptions.PropertyExceptions
{
    public class InvalidUserIdInNewPropertyException : BadRequestException
    {
        public InvalidUserIdInNewPropertyException() : base("You can only create properties that will belong to you.")
        {

        }
    }
}
