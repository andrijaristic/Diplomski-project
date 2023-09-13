using Domain.Exceptions.Common;

namespace Domain.Exceptions.RoomTypeExceptions
{
    public class InvalidMonthPriceException : BadRequestException
    {
        public InvalidMonthPriceException() : base("Month price must be higher than 0.") 
        {
        
        }
    }
}
