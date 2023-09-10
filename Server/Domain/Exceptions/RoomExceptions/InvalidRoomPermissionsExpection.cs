using Domain.Exceptions.Common;

namespace Domain.Exceptions.RoomExceptions
{
    public class InvalidRoomPermissionsExpection : BadRequestException
    {
        public InvalidRoomPermissionsExpection() : base("You can only edit/delete rooms of properties you own.")
        {

        }
    }
}
