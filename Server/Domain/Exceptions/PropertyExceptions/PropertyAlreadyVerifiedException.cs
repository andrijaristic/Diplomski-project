using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.PropertyExceptions
{
    public class PropertyAlreadyVerifiedException : BadRequestException
    {
        public PropertyAlreadyVerifiedException() : base("Property is already verified.")
        {

        }
    }
}
