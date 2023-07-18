using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.PropertyDTOs
{
    public class UpdatePropertyDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public List<IFormFile> Images { get; set; }
        public Guid UserId { get; set; }
    }
}
