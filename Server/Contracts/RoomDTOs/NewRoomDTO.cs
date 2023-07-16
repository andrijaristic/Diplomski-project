using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.RoomDTOs
{
    public class NewRoomDTO
    {
        public Guid Id { get; set; }
        public Guid PropertyId { get; set; }
        public RoomTypeDTO RoomType { get; set; }
    }
}
