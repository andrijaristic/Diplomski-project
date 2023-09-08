using Contracts.Common;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    public interface IPropertyRepository : IGenericRepository<Property>
    {
        Task<List<Property>> GetFilteredAcccommodations(SearchParamsDTO searchParamsDTO);
        Task<List<Property>> GetHighestRatedAccommodations();
        Task<Property> GetPropertyWithOwner(Guid id);
        Task<Property> GetFullPropertyById (Guid id);
        Task<List<Property>> GetUserAccommodations(Guid userId);
        Task<Property> GetWithComments(Guid id);
    }
}
