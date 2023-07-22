using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.RoomTypeExceptions
{
    public class RoomTypeNotFoundException : BadRequestException
    {
        public RoomTypeNotFoundException(Guid id) : base($"RoomType with ID:{id} was not found") { }
    }
}
