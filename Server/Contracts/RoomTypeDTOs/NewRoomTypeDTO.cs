using Contracts.SeasonalPricingDTOs;

namespace Contracts.RoomTypeDTOs
{
    public class NewRoomTypeDTO
    {
        public Guid Id { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }
        public Guid AccommodationId { get; set; }
        public int AmountOfRooms { get; set; }
        public List<NewSeasonalPricingDTO> SeasonalPricing { get; set; }
    }
}
