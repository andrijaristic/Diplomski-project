using Domain.Exceptions.Common;

namespace Domain.Exceptions.PropertyExceptions
{
    public class InvalidPropertyDescriptionException : BadRequestException
    {
        public InvalidPropertyDescriptionException(string description) : base($"{description} is an invalid property description.") { }
    }
}
