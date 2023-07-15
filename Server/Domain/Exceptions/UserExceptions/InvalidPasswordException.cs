using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.UserExceptions
{
    public class InvalidPasswordException : BadRequestException
    {
        public InvalidPasswordException() : base("Provided password is invalid.") { }
    }
}
