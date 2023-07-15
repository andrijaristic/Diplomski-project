using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Utilities
{
    public interface IAuthUtility
    {
        string CreateToken(Guid id, string username, UserType userRole, string key, string issuer, int duration);
    }
}
