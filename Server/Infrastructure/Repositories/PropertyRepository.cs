using Contracts.Common;
using Domain.Interfaces.Repositories;
using Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class PropertyRepository : GenericRepository<Property>, IPropertyRepository
    {
        public PropertyRepository(ProjectDbContext _dbContext) : base(_dbContext)
        {

        }

        public async Task<List<Property>> GetHighestRatedAccommodations()
        {
            List<Property> properties = await _dbContext
                                                    .Properties
                                                    .OrderBy(p => p.AverageGrade)
                                                    .Take(5)
                                                    .Include(p => p.ThumbnailImage)
                                                    .ToListAsync();
            return properties;
        }
 
        public Task<List<Property>> GetFilteredAcccommodations(SearchParamsDTO searchParamsDTO)
        {
            var source = _dbContext
                            .Properties
                            .Include(p => p.Rooms)
                            .Include(p => p.RoomTypes)
                            .Include(p => p.Utilities)
                            .Include(p => p.ThumbnailImage)
                            .AsQueryable();

            if (!String.IsNullOrEmpty(searchParamsDTO.ArrivalDate))
            {
                if(!DateTime.TryParse(searchParamsDTO.ArrivalDate, out DateTime arrivalDate))
                {
                    return null;
                }

                source = source
                            .Where(x => x.Rooms
                            .Any(x => x.OccupiedDates
                            .Any(x => x.ArrivalDate.Ticks > arrivalDate.Ticks)));
            }

            if (!String.IsNullOrEmpty(searchParamsDTO.DepartureDate))
            {
                if (!DateTime.TryParse(searchParamsDTO.DepartureDate, out DateTime departureDate))
                {
                    return null;
                }

                source = source
                            .Where(x => x.Rooms
                            .Any(x => x.OccupiedDates
                            .Any(x => x.DepartureDate.Ticks < departureDate.Ticks)));
            }

            if (!String.IsNullOrEmpty(searchParamsDTO.Adults))
            {
                if (!int.TryParse(searchParamsDTO.Adults, out int adults))
                {
                    return null;
                }

                source = source
                            .Where(x => x.RoomTypes
                            .Any(x => x.Adults == adults));
            }

            if (!String.IsNullOrEmpty(searchParamsDTO.Children))
            {
                if (!int.TryParse(searchParamsDTO.Children, out int children))
                {
                    return null;
                }


                source = source
                            .Where(x => x.RoomTypes
                            .Any(x => x.Children == children));
            }

            if (!String.IsNullOrEmpty(searchParamsDTO.MinPrice))
            {
                if (!int.TryParse(searchParamsDTO.MinPrice, out int minPrice))
                {
                    return null;
                }

                source = source
                            .Where(x => x.RoomTypes
                            .Any(x => x.SeasonalPricing
                            .Any(x => x.Price >= minPrice)));
            }

            if (!String.IsNullOrEmpty(searchParamsDTO.MaxPrice))
            {
                if (!int.TryParse(searchParamsDTO.MaxPrice, out int maxPrice))
                {
                    return null;
                }

                source = source
                            .Where(x => x.RoomTypes
                            .Any(x => x.SeasonalPricing
                            .Any(x => x.Price <= maxPrice)));
            }

            if (searchParamsDTO.Utilities != null && 
                searchParamsDTO.Utilities.Count > 0)
            {
                source = source
                            .Where(x => x.Utilities
                            .Any(x => x.Id.Equals(searchParamsDTO.Utilities)));
            }

            return source.ToListAsync();
        }

        public async Task<Property> GetFullPropertyById(Guid id)
        {
            Property property = await _dbContext
                                            .Properties
                                            .Where(p => p.Id == id)
                                            .Include(p => p.Comments)
                                            .Include(p => p.ThumbnailImage)
                                            .Include(p => p.Images)
                                            .Include(p => p.Utilities)
                                            .FirstOrDefaultAsync();
            return property;
        }

        public async Task<Property> GetPropertyWithOwner(Guid id)
        {
            Property property = await _dbContext
                                            .Properties
                                            .Where(p => p.Id == id)                             
                                            .Include(u => u.User)
                                            .FirstOrDefaultAsync();
            return property;
        }

        public async Task<List<Property>> GetUserAccommodations(Guid userId)
        {
            List<Property> properties = await _dbContext
                                                    .Properties
                                                    .Where(p => p.UserId == userId)
                                                    .Include(p => p.ThumbnailImage)
                                                    .ToListAsync();
            return properties;
        }
    }
}
