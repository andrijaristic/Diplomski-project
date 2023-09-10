using Domain.Exceptions.Common;

namespace Domain.Exceptions.ReservationExceptions
{
    public class ReservationIsPaidForException : BadRequestException
    {
        public ReservationIsPaidForException() : base("Reservation is already paid for.") { }
    }
}
