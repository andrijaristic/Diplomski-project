using Domain.Exceptions.Common;

namespace Domain.Exceptions.PropertyUtilityExceptions
{
    public class UtilityNotFoundException : BadRequestException
    {
        public UtilityNotFoundException(Guid id) : base($"Utility with ID: [{id}] does not exist")
        {
        }
    }
}
