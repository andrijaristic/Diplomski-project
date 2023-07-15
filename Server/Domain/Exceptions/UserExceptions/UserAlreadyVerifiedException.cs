using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.UserExceptions
{
    public class UserAlreadyVerifiedException : BadRequestException
    {
        public UserAlreadyVerifiedException() : base("User is already verified.")
        {

        }
    }
}
