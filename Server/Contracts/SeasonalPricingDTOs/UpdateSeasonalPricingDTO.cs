using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.SeasonalPricingDTOs
{
    public class UpdateSeasonalPricingDTO
    {
        public Guid Id { get; set; }
        public int Price { get; set; }
    }
}
