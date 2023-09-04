using Contracts.SeasonalPricingDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.RoomTypeDTOs
{
    public class RoomTypeMinimalDTO
    {
        public Guid Id { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }
        public List<SeasonalPricingMinimalDTO> SeasonalPricing { get; set; }
    }
}
