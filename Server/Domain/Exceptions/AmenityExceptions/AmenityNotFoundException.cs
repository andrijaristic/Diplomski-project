using Domain.Exceptions.Common;

namespace Domain.Exceptions.AmenityExceptions
{
    public class AmenityNotFoundException : BadRequestException
    {
        public AmenityNotFoundException(Guid id) : base($"Amenity with ID: [{id}] does not exist")
        {

        }
    }
}
