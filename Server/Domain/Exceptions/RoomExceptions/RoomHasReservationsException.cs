using Domain.Exceptions.Common;

namespace Domain.Exceptions.RoomExceptions
{
    public class RoomHasReservationsException : BadRequestException
    {
        public RoomHasReservationsException() : base("This room has reservations and cannot be deleted.") 
        {
        
        }
    }
}
