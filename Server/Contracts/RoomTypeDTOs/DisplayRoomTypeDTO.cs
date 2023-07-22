using Contracts.SeasonalPricingDTOs;

namespace Contracts.RoomTypeDTOs
{
    public class DisplayRoomTypeDTO
    {
        public Guid Id { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }
        public List<DisplaySeasonalPricingDTO> SeasonalPricing { get; set; }
    }
}
