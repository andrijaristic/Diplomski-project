using Domain.Enums;

namespace Domain.Models
{
    public class SeasonalPricing
    {
        public Guid Id { get; set; }
        public Season Season { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid RoomTypeId { get; set; }
        public RoomType RoomType { get; set; }
        public int Price { get; set; }
    }
}
