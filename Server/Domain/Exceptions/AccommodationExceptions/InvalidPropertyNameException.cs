using Domain.Exceptions.Common;

namespace Domain.Exceptions.PropertyExceptions
{
    public class InvalidPropertyNameException : BadRequestException
    {
        public InvalidPropertyNameException(string name) : base($"{name} is an invalid property name.") { }
    }
}
