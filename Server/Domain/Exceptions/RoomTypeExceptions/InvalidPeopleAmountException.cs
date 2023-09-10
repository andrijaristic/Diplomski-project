using Domain.Exceptions.Common;

namespace Domain.Exceptions.RoomTypeExceptions
{
    public class InvalidPeopleAmountException : BadRequestException
    {
        public InvalidPeopleAmountException() : base($"Room must accomodate for at least one adult or child.") { }
    }
}
