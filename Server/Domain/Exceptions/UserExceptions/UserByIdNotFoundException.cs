using Domain.Exceptions.Common;

namespace Domain.Exceptions.UserExceptions
{
    public class UserByIdNotFoundException : NotFoundException
    {
        public UserByIdNotFoundException(Guid id) : base($"User with ID: {id} has not been found.") { }
    }
}
