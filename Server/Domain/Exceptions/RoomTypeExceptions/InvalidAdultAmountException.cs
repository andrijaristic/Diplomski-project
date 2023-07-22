using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.RoomTypeExceptions
{
    public class InvalidAdultAmountException : BadRequestException
    {
        public InvalidAdultAmountException() : base($"You cannot have negative adults in a room.") { }
    }
}
