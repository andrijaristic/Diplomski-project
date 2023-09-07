using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.PropertyUtilityExceptions
{
    public class UtilityNotFoundException : BadRequestException
    {
        public UtilityNotFoundException(Guid id) : base($"Utility with ID: [{id}] does not exist")
        {
        }
    }
}
