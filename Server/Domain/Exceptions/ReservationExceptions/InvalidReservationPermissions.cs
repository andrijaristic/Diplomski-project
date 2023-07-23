using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.ReservationExceptions
{
    public class InvalidReservationPermissions : BadRequestException
    {
        public InvalidReservationPermissions() : base("You can only edit/delete your own reservations.") { }
    }
}
