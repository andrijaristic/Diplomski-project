using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.PropertyExceptions
{
    public class InvalidPropertyDescriptionException : BadRequestException
    {
        public InvalidPropertyDescriptionException(string description) : base($"{description} is an invalid property description.") { }
    }
}
