using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.UserExceptions
{
    public class UserUsernameExistsException : BadRequestException
    {
        public UserUsernameExistsException() : base($"Username already exists.") { }
    }
}
