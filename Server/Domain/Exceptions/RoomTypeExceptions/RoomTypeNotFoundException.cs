using Domain.Exceptions.Common;

namespace Domain.Exceptions.RoomTypeExceptions
{
    public class RoomTypeNotFoundException : BadRequestException
    {
        public RoomTypeNotFoundException(Guid id) : base($"RoomType with ID:{id} was not found") { }
    }
}
