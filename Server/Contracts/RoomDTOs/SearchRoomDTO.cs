namespace Contracts.RoomDTOs
{
    public class SearchRoomDTO
    {
        public Guid AmenityId { get; set; }
        public int Adults { get; set; }
        public int Children { get; set; }
        public DateTime ArrivalDate { get; set; }
        public DateTime DepartureDate { get; set; }
    }
}
