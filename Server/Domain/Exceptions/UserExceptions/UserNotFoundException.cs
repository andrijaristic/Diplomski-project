using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.UserExceptions
{
    public class UserNotFoundException : BadRequestException
    {
        public UserNotFoundException(string username) : base($"User with username {username} does not exist.") { }
    }
}
