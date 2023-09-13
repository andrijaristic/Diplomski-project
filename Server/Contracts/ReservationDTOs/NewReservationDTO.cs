namespace Contracts.ReservationDTOs
{
    public class NewReservationDTO
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public Guid AccommodationId { get; set; }
        public Guid RoomId { get; set; }
        public double Price { get; set; }
        public DateTime ArrivalDate { get; set; }
        public DateTime DepartureDate { get; set; }

    }
}
