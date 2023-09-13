using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.AccommodationDTOs
{
    public class DeleteImageDTO
    {
        public Guid ImageId { get; set; }
        public Guid UserId { get; set; }
    }
}
