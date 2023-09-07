using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.CommentExceptions
{
    public class InvalidCommentHeaderException : BadRequestException
    {
        public InvalidCommentHeaderException() : base("Comment title must not be empty")
        {
        }
    }
}
