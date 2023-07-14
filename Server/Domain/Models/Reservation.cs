using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Reservation
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid PropertyId { get; set; }
        public Property Property { get; set; }
        public Guid RoomId { get; set; }
        public Room Room { get; set; }
        public double Price { get; set; }   
        public DateTime ArrivalDate { get; set; }
        public DateTime DepartureDate { get; set;}
        public bool IsPayed { get; set; }   
        public bool IsCancelled { get; set; }
    }
}
