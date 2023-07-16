using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.PropertyExceptions
{
    public class InvalidUserIdInNewPropertyException : BadRequestException
    {
        public InvalidUserIdInNewPropertyException() : base("You can only create properties that will belong to you.")
        {

        }
    }
}
