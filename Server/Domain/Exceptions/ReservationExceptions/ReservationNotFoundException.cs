using Domain.Exceptions.Common;

namespace Domain.Exceptions.ReservationExceptions
{
    public class ReservationNotFoundException : BadRequestException
    {
        public ReservationNotFoundException(Guid id) : base($"Reservation with ID: {id} does not exist.")
        {

        }
    }
}
