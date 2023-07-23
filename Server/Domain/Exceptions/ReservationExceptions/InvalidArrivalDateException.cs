using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.ReservationExceptions
{
    public class InvalidArrivalDateException : BadRequestException
    {
        public InvalidArrivalDateException() : base("Arrival date cannot be after departure date.")
        {

        }
    }
}
