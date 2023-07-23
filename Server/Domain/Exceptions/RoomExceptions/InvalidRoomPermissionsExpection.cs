using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.RoomExceptions
{
    public class InvalidRoomPermissionsExpection : BadRequestException
    {
        public InvalidRoomPermissionsExpection() : base("You can only edit rooms of properties you own.")
        {

        }
    }
}
