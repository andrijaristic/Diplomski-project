using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.RoomDTOs
{
    public class SearchRoomDTO
    {
        public Guid PropertyId { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }
        public DateTime ArrivalDate { get; set; }
        public DateTime DepartureDate { get; set; }
    }
}
