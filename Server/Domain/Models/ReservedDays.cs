namespace Domain.Models
{
    public class ReservedDays
    {
        public Guid Id { get; set; }
        public DateTime ArrivalDate { get; set; }
        public DateTime DepartureDate { get; set; }
        public Guid RoomId { get; set; }
        public Room Room { get; set; }
    }
}
