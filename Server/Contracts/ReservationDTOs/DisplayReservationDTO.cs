namespace Contracts.ReservationDTOs
{
    public class DisplayReservationDTO
    {
        public Guid Id { get; set; }
        public Guid AccommodationId { get; set; }
        public string AccommodationName { get; set; }
        public DateTime ArrivalDate { get; set; }
        public DateTime DepartureDate { get; set; }
        public double Price { get; set; }
        public bool IsPayed { get; set; }
        public bool IsCancelled { get; set; }
    }
}
