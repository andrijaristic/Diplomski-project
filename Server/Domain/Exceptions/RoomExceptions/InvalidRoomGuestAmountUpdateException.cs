using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.RoomExceptions
{
    public class InvalidRoomGuestAmountUpdateException : BadRequestException
    {
        public InvalidRoomGuestAmountUpdateException() : base("Room cannot be changed to have smaller capacity")
        {
        }
    }
}
