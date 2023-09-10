using Domain.Exceptions.Common;

namespace Domain.Exceptions.UserExceptions
{
    public class InvalidUserInformationException : BadRequestException
    {
        public InvalidUserInformationException() : base("You can only change your own information")
        {

        }
    }
}
