using Domain.Exceptions.Common;

namespace Domain.Exceptions.RoomExceptions
{
    public class RoomNotFoundException : BadRequestException
    {
        public RoomNotFoundException(Guid id) : base($"Room with ID: {id} does not exist.") 
        {
        
        }
    }
}
