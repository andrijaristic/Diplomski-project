using Domain.Exceptions.Common;

namespace Domain.Exceptions.ReservationExceptions
{
    public class InvalidReservationPermissions : BadRequestException
    {
        public InvalidReservationPermissions() : base("You can only edit/delete your own reservations.") 
        {
        
        }
    }
}
