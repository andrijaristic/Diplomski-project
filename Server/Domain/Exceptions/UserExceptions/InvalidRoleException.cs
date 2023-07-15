using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.UserExceptions
{
    public class InvalidRoleException : BadRequestException
    {
        public InvalidRoleException(string role) : base($"{role.ToUpper()} is invalid role.")
        {

        }
    }
}
