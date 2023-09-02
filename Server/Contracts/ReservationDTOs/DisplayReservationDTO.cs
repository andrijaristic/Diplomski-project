using Contracts.RoomDTOs;
using Contracts.RoomTypeDTOs;
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
        public string PropertyName { get; set; }
        public DateTime ArrivalDate { get; set; }
        public DateTime DepartureDate { get; set; }
        public double Price { get; set; }
        public bool IsPayed { get; set; }
        public bool IsCancelled { get; set; }
    }
}
