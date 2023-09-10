using Domain.Exceptions.Common;

namespace Domain.Exceptions.UserExceptions
{
    public class UserNotVerifiedException : BadRequestException
    {
        public UserNotVerifiedException() : base("User is not verified")
        {

        }
    }
}
