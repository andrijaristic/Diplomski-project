using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.SeasonalPricingDTOs
{
    public class NewSeasonalPricingDTO
    {
        public Guid Id { get; set; }
        public string Season { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid RoomTypeId { get; set; }
        public int Price { get; set; }
    }
}
