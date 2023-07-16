using Contracts.SeasonalPricingDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.RoomDTOs
{
    public class RoomTypeDTO
    {
        public Guid Id { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }
        public Guid PropertyId { get; set; }
        public List<NewSeasonalPricingDTO> SeasonalPricing { get; set; }
    }
}
