using Contracts.RoomTypeDTOs;

namespace Contracts.RoomDTOs
{
    public class DisplayRoomDTO
    {
        public Guid Id { get; set; }
        public DisplayRoomTypeDTO RoomType { get; set; }
    }
}
