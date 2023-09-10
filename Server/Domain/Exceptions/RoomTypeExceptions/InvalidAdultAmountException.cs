using Domain.Exceptions.Common;

namespace Domain.Exceptions.RoomTypeExceptions
{
    public class InvalidAdultAmountException : BadRequestException
    {
        public InvalidAdultAmountException() : base($"You cannot have negative adults in a room.") { }
    }
}
