using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.CommentDTOs
{
    public class DisplayCommentDTO
    {
        public Guid Id { get; set; }
        public Guid PropertyId { get; set; }
        public string PropertyName { get; set; }
        public string UserFullName { get; set; }
        public string Header { get; set; }
        public string Content { get; set; }
        public double Grade { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
