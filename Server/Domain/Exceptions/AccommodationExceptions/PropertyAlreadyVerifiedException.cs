using Domain.Exceptions.Common;

namespace Domain.Exceptions.PropertyExceptions
{
    public class PropertyAlreadyVerifiedException : BadRequestException
    {
        public PropertyAlreadyVerifiedException() : base("Property is already verified.")
        {

        }
    }
}
