using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.ReservationExceptions
{
    public class ReservationAlreadyCancelledException : BadRequestException
    {
        public ReservationAlreadyCancelledException() : base("Reservation is already cancelled.") { }
    }
}
