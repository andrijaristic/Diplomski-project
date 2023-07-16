using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.PropertyExceptions
{
    public class InvalidPropertyUserRoleException : BadRequestException
    {
        public InvalidPropertyUserRoleException() : base("User is not PROPERTY OWNER.")
        {

        }
    }
}
