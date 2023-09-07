using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.CommentExceptions
{
    public class InvalidCommentPermissions : BadRequestException
    {
        public InvalidCommentPermissions() : base("User has never completed a reservation")
        {
        }
    }
}
