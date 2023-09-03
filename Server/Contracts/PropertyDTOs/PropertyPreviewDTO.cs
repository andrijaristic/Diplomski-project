using Contracts.AccommodationImageDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.PropertyDTOs
{
    public class PropertyPreviewDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string Area { get; set; }
        public int StartingPrice { get; set; }
        public AccommodationImageDTO ThumbnailImage { get; set; }
    }
}
