using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.ReservationExceptions
{
    public class ReservationAlreadyHappenedException : BadRequestException
    {
        public ReservationAlreadyHappenedException() : base("Reservation cannot be cancelled as it is completed.")
        {

        }
    }
}
