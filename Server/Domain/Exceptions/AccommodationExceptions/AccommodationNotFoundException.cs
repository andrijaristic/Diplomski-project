using Domain.Exceptions.Common;

namespace Domain.Exceptions.AccommodationExceptions
{
    public class AccommodationNotFoundException : BadRequestException
    {
        public AccommodationNotFoundException(Guid id) : base($"Accommodation with ID: {id} does not exist.")
        {
        
        }
    }
}
