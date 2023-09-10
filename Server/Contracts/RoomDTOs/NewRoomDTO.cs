namespace Contracts.RoomDTOs
{
    public class NewRoomDTO
    {
        public Guid Id { get; set; }
        public int AmountOfRooms { get; set; }
        public Guid PropertyId { get; set; }
        public Guid RoomTypeId { get; set; }
    }
}
