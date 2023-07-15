using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.AppSettings
{
    public class AppSettings
    {
        public string SecretKey { get; set; }
        public int MinUsernameLength { get; set; }
        public int MinPasswordLength { get; set; }
        public string TokenIssuer { get; set; }
        public int TokenDuration { get; set; }
    }
}
