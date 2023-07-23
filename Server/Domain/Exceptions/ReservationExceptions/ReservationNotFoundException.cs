using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.ReservationExceptions
{
    public class ReservationNotFoundException : BadRequestException
    {
        public ReservationNotFoundException(Guid id) : base($"Reservation with ID: {id} does not exist.")
        {

        }
    }
}
