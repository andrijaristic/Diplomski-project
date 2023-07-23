using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.RoomExceptions
{
    public class RoomForPropertyNotFoundException : BadRequestException
    {
        public RoomForPropertyNotFoundException() : base("Room for linked property does not exist.") { }
    }
}
