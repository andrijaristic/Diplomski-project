using Contracts.SeasonalPricingDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.RoomTypeDTOs
{
    public class UpdateRoomTypeDTO
    {
        public List<UpdateSeasonalPricingDTO> SeasonalPrices { get; set; }  
    }
}
