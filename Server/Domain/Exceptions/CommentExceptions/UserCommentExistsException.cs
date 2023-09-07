using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.CommentExceptions
{
    public class UserCommentExistsException : BadRequestException
    {
        public UserCommentExistsException() : base("User has already made comment for this accommodation")
        {
        }
    }
}
