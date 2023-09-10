using Domain.Exceptions.Common;

namespace Domain.Exceptions.PropertyExceptions
{
    public class PropertyImageAmountExceededException : BadRequestException
    {
        public PropertyImageAmountExceededException() : base("You cannot have more display images (max. 5).")
        {

        }
    }
}
