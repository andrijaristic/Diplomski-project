using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.CommentDTOs
{
    public class NewCommentDTO
    {
        public Guid PropertyId { get; set; }
        public string Header { get; set; }
        public string Content { get; set; }
        public double Grade { get; set; }
    }
}
