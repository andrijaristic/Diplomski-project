using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Room
    {
        public Guid Id { get; set; }    
        public Guid RoomTypeId { get; set; }
        public RoomType RoomType { get; set; }
        public List<ReservedDays> OccupiedDates { get; set; }
        public Guid PropertyId { get; set; }    
        public Accommodation Property { get; set; }
        public List<Reservation> Reservations { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
