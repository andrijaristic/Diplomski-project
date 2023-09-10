using Domain.Exceptions.Common;

namespace Domain.Exceptions.UserExceptions
{
    public class UserAlreadyVerifiedException : BadRequestException
    {
        public UserAlreadyVerifiedException() : base("User is already verified.")
        {

        }
    }
}
