using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.UserExceptions
{
    public class InvalidFavoriteAccommodationsPermissionsException : BadRequestException
    {
        public InvalidFavoriteAccommodationsPermissionsException() : base("You can only get favorites for yourself")
        {

        }
    }
}
