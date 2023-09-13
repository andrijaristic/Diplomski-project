namespace Domain.Models
{
    public class Room
    {
        public Guid Id { get; set; }
        public Guid RoomTypeId { get; set; }
        public RoomType RoomType { get; set; }
        public List<ReservedDays> OccupiedDates { get; set; }
        public Guid AccommodationId { get; set; }
        public Accommodation Accommodation { get; set; }
        public List<Reservation> Reservations { get; set; }
        public bool IsDeleted { get; set; } = false;
    }
}
