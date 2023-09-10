using Domain.Exceptions.Common;

namespace Domain.Exceptions.RoomTypeExceptions
{
    public class InvalidRoomTypePermissionsException : BadRequestException
    {
        public InvalidRoomTypePermissionsException() : base($"You can only edit room types of properties you own.") { }
    }
}
