using Domain.Exceptions.Common;

namespace Domain.Exceptions.RoomExceptions
{
    public class RoomForPropertyNotFoundException : BadRequestException
    {
        public RoomForPropertyNotFoundException() : base("Room for linked property does not exist.") { }
    }
}
