using Domain.Exceptions.Common;

namespace Domain.Exceptions.RoomTypeExceptions
{
    public class InvalidMonthAmountException : BadRequestException
    {
        public InvalidMonthAmountException() : base($"You must have exactly 12 months listed for pricing.") 
        {
        
        }
    }
}
