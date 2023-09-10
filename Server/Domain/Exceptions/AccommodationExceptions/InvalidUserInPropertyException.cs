using Domain.Exceptions.Common;

namespace Domain.Exceptions.PropertyExceptions
{
    public class InvalidUserInPropertyException : BadRequestException
    {
        public InvalidUserInPropertyException() : base("You can only edit your own properties.") { }
    }
}
