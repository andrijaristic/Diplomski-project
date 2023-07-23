using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.RoomExceptions
{
    public class RoomNotFoundException : BadRequestException
    {
        public RoomNotFoundException(Guid id) : base($"Room with ID: {id} does not exist.") { }
    }
}
