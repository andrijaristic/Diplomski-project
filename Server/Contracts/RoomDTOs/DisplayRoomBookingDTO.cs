using Contracts.RoomTypeDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.RoomDTOs
{
    public class DisplayRoomBookingDTO
    {
        public Guid Id { get; set; }
        public DateTime ArrivalDate { get; set; }
        public DateTime DepartureDate { get; set; }
        public RoomTypeMinimalDTO RoomType { get; set; }
        public double Price { get; set; }
    }
}
