using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.UserExceptions
{
    public class InvalidInputFieldException : BadRequestException
    {
        public InvalidInputFieldException(string field) : base($"${field} is invalid.") { }
    }
}
