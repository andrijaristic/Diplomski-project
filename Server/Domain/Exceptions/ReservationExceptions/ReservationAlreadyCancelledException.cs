using Domain.Exceptions.Common;

namespace Domain.Exceptions.ReservationExceptions
{
    public class ReservationAlreadyCancelledException : BadRequestException
    {
        public ReservationAlreadyCancelledException() : base("Reservation is already cancelled.") { }
    }
}
