using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.UserDTOs
{
    public class ExternalLoginDTO
    {
        public string Token { get; set; }
        public string Service { get; set; }
        public string Role { get; set; }
    }
}
