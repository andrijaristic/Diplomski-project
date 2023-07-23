using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.RoomExceptions
{
    public class RoomHasReservationsException : BadRequestException
    {
        public RoomHasReservationsException() : base("This room has reservations and cannot be deleted.") { }
    }
}
