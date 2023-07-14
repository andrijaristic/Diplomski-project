using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class RoomType
    {
        public Guid Id { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }
        public Guid PropertyId { get; set; }
        public Property Property { get; set; }
        public List<Room> Rooms { get; set; }   
        public List<SeasonalPricing> SeasonalPricing { get; set; }
    }
}
