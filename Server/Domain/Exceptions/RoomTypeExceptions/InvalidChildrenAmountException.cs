using Domain.Exceptions.Common;

namespace Domain.Exceptions.RoomTypeExceptions
{
    public class InvalidChildrenAmountException : BadRequestException
    {
        public InvalidChildrenAmountException() : base($"You cannot have negative children in a room.") 
        {
        
        }
    }
}
