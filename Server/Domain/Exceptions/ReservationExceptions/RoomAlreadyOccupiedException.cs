using Domain.Exceptions.Common;

namespace Domain.Exceptions.ReservationExceptions
{
    public class RoomAlreadyOccupiedException : BadRequestException
    {
        public RoomAlreadyOccupiedException() : base($"Room is already occupied for these dates") 
        {
        
        }
    }
}
