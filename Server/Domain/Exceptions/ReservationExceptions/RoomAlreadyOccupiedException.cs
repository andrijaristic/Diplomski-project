using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.ReservationExceptions
{
    public class RoomAlreadyOccupiedException : BadRequestException
    {
        public RoomAlreadyOccupiedException() : base($"Room is already occupied for these dates") { }
    }
}
