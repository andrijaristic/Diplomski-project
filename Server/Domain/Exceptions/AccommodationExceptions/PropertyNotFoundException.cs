using Domain.Exceptions.Common;

namespace Domain.Exceptions.PropertyExceptions
{
    public class PropertyNotFoundException : BadRequestException
    {
        public PropertyNotFoundException(Guid id) : base($"Property with ID: {id} does not exist.") { }
    }
}
