using Domain.Exceptions.Common;

namespace Domain.Exceptions.ReservationExceptions
{
    public class InvalidArrivalDateException : BadRequestException
    {
        public InvalidArrivalDateException() : base("Arrival date cannot be after departure date.")
        {

        }
    }
}
