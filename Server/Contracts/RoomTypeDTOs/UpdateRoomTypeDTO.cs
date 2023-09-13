using Contracts.SeasonalPricingDTOs;

namespace Contracts.RoomTypeDTOs
{
    public class UpdateRoomTypeDTO
    {
        public List<UpdateSeasonalPricingDTO> SeasonalPrices { get; set; }
    }
}
