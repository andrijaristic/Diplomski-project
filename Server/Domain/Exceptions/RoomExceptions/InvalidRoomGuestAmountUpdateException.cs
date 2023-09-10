using Domain.Exceptions.Common;

namespace Domain.Exceptions.RoomExceptions
{
    public class InvalidRoomGuestAmountUpdateException : BadRequestException
    {
        public InvalidRoomGuestAmountUpdateException() : base("Room cannot be changed to have smaller capacity")
        {

        }
    }
}
