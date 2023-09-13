using Domain.Exceptions.Common;

namespace Domain.Exceptions.RoomTypeExceptions
{
    public class InvalidAmountOfRoomsException : BadRequestException
    {
        public InvalidAmountOfRoomsException() : base("You cannot have less than 0 rooms") 
        {
        
        }
    }
}
