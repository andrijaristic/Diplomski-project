using Domain.Exceptions.Common;

namespace Domain.Exceptions.RoomExceptions
{
    public class InsufficientRoomsException : BadRequestException
    {
        public InsufficientRoomsException() : base("Accommodation will not have any more rooms left. Deletion unavailable")
        {
        }
    }
}
