using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.UserExceptions
{
    public class InvalidExternalLoginServiceException : BadRequestException
    {
        public InvalidExternalLoginServiceException(string service) : base($"{service} is not supported external login service.")
        {

        }
    }
}
