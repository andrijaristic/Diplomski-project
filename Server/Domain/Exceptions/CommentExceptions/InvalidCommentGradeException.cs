using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.CommentExceptions
{
    public class InvalidCommentGradeException : BadRequestException
    {
        public InvalidCommentGradeException() : base("Grade given must be between 1 and 5")
        {
        }
    }
}
