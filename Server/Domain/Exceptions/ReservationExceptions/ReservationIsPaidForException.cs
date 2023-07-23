using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.ReservationExceptions
{
    public class ReservationIsPaidForException : BadRequestException
    {
        public ReservationIsPaidForException() : base("Reservation is already paid for.") { }
    }
}
