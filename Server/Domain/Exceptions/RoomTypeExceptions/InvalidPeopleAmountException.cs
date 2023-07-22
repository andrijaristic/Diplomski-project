using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.RoomTypeExceptions
{
    public class InvalidPeopleAmountException : BadRequestException
    {
        public InvalidPeopleAmountException() : base($"Room must accomodate for at least one adult or child.") { }
    }
}
