using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.PropertyExceptions
{
    public class InvalidPropertyNameException : BadRequestException
    {
        public InvalidPropertyNameException(string name) : base($"{name} is an invalid property name.") { }
    }
}
