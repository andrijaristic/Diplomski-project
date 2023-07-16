using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.PropertyExceptions
{
    public class PropertyNotFoundException : BadRequestException
    {
        public PropertyNotFoundException(Guid id) : base($"Property with ID: {id} does not exist.") { }
    }
}
