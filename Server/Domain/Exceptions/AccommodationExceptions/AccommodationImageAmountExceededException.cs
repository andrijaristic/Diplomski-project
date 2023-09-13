using Domain.Exceptions.Common;

namespace Domain.Exceptions.AccommodationExceptions
{
    public class AccommodationImageAmountExceededException : BadRequestException
    {
        public AccommodationImageAmountExceededException() : base("You cannot have more display images (max. 5).")
        {

        }
    }
}
