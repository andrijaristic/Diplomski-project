using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.RoomTypeExceptions
{
    public class InvalidChildrenAmountException : BadRequestException
    {
        public InvalidChildrenAmountException() : base($"You cannot have negative children in a room.") { }
    }
}
