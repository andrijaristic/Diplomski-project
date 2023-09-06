using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    public interface IReservedDaysRepository : IGenericRepository<ReservedDays>
    {
        Task<ReservedDays> FindByDatesAndRoom(DateTime arrivalDate, DateTime departureDate, Guid roomId);
    }
}
