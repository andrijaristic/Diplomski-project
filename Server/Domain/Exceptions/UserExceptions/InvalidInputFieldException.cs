using Domain.Exceptions.Common;

namespace Domain.Exceptions.UserExceptions
{
    public class InvalidInputFieldException : BadRequestException
    {
        public InvalidInputFieldException(string field) : base($"{field} is invalid.") { }
    }
}
