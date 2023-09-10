using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class PropertyUtility
    {
        public Guid Id { get; set; }
        public PropertyUtilities Utility { get; set; }
        public List<Accommodation> Properties { get; set; }
    }
}
