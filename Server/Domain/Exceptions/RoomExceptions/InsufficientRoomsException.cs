using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.RoomExceptions
{
    public class InsufficientRoomsException : BadRequestException
    {
        public InsufficientRoomsException() : base("Accommodation will not have any more rooms left. Deletion unavailable")
        {
        }
    }
}
