using Contracts.PropertyUtilityDTOs;
using Contracts.RoomDTOs;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.PropertyDTOs
{
    public class NewPropertyDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } 
        public string Description { get; set; }
        public string Country { get; set; }
        public string Area { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public List<Guid> Utilities { get; set; }   
        public Guid UserId { get; set; }
        public IFormFile ThumbnailImage { get; set; }
    }
}
