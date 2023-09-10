using Domain.Exceptions.Common;

namespace Domain.Exceptions.RoomExceptions
{
    public class InvalidRoomSearchDatesException : BadRequestException
    {
        public InvalidRoomSearchDatesException() : base("Arrival date cannot be after departure date and vice versa")
        {
        }
    }
}
