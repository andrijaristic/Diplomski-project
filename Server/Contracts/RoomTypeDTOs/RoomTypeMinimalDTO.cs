using Contracts.SeasonalPricingDTOs;

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
