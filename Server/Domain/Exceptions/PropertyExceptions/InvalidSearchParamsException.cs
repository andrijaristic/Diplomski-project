using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.PropertyExceptions
{
    public class InvalidSearchParamsException : BadRequestException
    {
        public InvalidSearchParamsException() : base("Invalid filter parameters provided. Something went wrong") 
        {
        }
    }
}
