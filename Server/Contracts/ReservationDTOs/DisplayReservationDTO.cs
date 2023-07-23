using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.ReservationDTOs
{
    public class DisplayReservationDTO
    {
        public Guid Id { get; set; }
        public Guid PropertyId { get; set; }
        public Guid RoomId { get; set; }
        public DateTime ArrivalDate { get; set; }
        public DateTime DepartureDate { get; set; }
        public bool IsPayed { get; set; }
        public bool IsCancelled { get; set; }
    }
}
