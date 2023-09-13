using Domain.Exceptions.Common;

namespace Domain.Exceptions.AccommodationExceptions
{
    public class AccommodationAlreadyVerifiedException : BadRequestException
    {
        public AccommodationAlreadyVerifiedException() : base("Property is already.")
        {

        }
    }
}
