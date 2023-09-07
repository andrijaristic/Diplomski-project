using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.CommentExceptions
{
    public class InvalidCommentContentException : BadRequestException
    {
        public InvalidCommentContentException() : base("Comment content must not be empty")
        {
        }
    }
}
