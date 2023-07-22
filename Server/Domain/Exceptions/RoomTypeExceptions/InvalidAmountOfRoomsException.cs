using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.RoomTypeExceptions
{
    public class InvalidAmountOfRoomsException : BadRequestException
    {
        public InvalidAmountOfRoomsException() : base("You cannot have less than 0 rooms") { }
    }
}
