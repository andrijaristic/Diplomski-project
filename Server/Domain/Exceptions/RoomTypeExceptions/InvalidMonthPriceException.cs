using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.RoomTypeExceptions
{
    public class InvalidMonthPriceException : BadRequestException
    {
        public InvalidMonthPriceException() : base("Month price must be higher than 0.") { }
    }
}
