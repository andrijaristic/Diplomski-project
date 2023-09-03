using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.PropertyExceptions
{
    public class PropertyImageAmountExceededException : BadRequestException
    {
        public PropertyImageAmountExceededException() : base("You cannot have more display images (max. 5).")
        {

        }
    }
}
