using Domain.Models;

namespace Domain.Interfaces.Repositories
{
    public interface IReservedDaysRepository : IGenericRepository<ReservedDays>
    {
        Task<ReservedDays> FindByDatesAndRoom(DateTime arrivalDate, DateTime departureDate, Guid roomId);
    }
}
