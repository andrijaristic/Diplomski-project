using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.RoomTypeExceptions
{
    public class InvalidRoomTypePermissionsException : BadRequestException
    {
        public InvalidRoomTypePermissionsException() : base($"You can only edit room types of properties you own.") { }
    }
}
