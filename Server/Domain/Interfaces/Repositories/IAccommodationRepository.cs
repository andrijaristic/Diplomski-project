using Contracts.Common;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    public interface IAccommodationRepository : IGenericRepository<Accommodation>
    {
        Task<Accommodation> GetWithFavorites(Guid id);
        Task<IEnumerable<Accommodation>> GetFilteredAcccommodations(SearchParamsDTO searchParamsDTO);
        Task<List<Accommodation>> GetHighestRatedAccommodations();
        Task<Accommodation> GetAccommodationWithOwner(Guid id);
        Task<Accommodation> GetFullAccommodationById (Guid id);
        Task<List<Accommodation>> GetUserAccommodations(Guid userId);
        Task<Accommodation> GetWithRooms(Guid id);
    }
}
