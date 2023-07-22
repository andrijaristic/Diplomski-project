using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.RoomTypeExceptions
{
    public class InvalidMonthAmountException : BadRequestException
    {
        public InvalidMonthAmountException() : base($"You must have exactly 12 months listed for pricing.") { }
    }
}
