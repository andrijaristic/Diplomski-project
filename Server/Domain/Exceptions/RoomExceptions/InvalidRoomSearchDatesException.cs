using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.RoomExceptions
{
    public class InvalidRoomSearchDatesException : BadRequestException
    {
        public InvalidRoomSearchDatesException() : base("Arrival date cannot be after departure date and vice versa")
        {
        }
    }
}
