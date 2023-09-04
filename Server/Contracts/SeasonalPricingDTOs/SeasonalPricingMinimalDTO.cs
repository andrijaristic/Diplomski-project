using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.SeasonalPricingDTOs
{
    public class SeasonalPricingMinimalDTO
    {
        public Guid Id { get; set; }
        public DateTime EndDate { get; set; }
        public double Price { get; set; }
    }
}
