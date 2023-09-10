namespace Domain.Models
{
    public class RoomType
    {
        public Guid Id { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }
        public Guid AccommodationId { get; set; }
        public Accommodation Accommodation { get; set; }
        public List<Room> Rooms { get; set; }
        public List<SeasonalPricing> SeasonalPricing { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
