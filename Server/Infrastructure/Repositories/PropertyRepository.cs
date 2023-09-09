using Microsoft.EntityFrameworkCore;
using Contracts.Common;
using Domain.Models;
using Domain.Interfaces.Repositories;
using Domain.Enums;
using System.Runtime.CompilerServices;
using Google.Apis.Util;
using Domain.Interfaces.Utilities.DataInitializers;

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
                                                    .AsNoTracking()
                                                    .Where(p => p.IsVisible)
                                                    .OrderBy(p => p.AverageGrade)
                                                    .Take(5)
                                                    .Include(p => p.ThumbnailImage)
                                                    .ToListAsync();
            return properties;
        }

        public async Task<Property> GetWithRooms(Guid id)
        {
            Property property = await _dbContext
                                            .Properties
                                            .AsNoTracking()
                                            .Where(p => p.Id == id && !p.IsDeleted)
                                            .Include(p => p.Rooms
                                            .Where(r => !r.IsDeleted))
                                            .FirstOrDefaultAsync();
            return property;
        }
 
        public Task<IEnumerable<Property>> GetFilteredAcccommodations(SearchParamsDTO searchParamsDTO)
        {
            var source = _dbContext
                            .Properties
                            .AsNoTracking()
                            .Where(p => p.IsVisible && 
                                       !p.IsDeleted)
                            .Include(p => p.Rooms
                            .Where(r => !r.IsDeleted))
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
                            .Any(x => !(x.ArrivalDate >= arrivalDate && x.DepartureDate <= arrivalDate))));
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
                            .Any(x => !(x.ArrivalDate >= departureDate && x.DepartureDate <= departureDate))));
            }

            if (!String.IsNullOrEmpty(searchParamsDTO.Country))
            {
                source = source
                            .Where(x => x.Country
                            .Equals(searchParamsDTO.Country));
            }

            if (!String.IsNullOrEmpty(searchParamsDTO.Area))
            {
                source = source
                            .Where(x => x.Area
                            .Equals(searchParamsDTO.Area));
            }

            if (!String.IsNullOrEmpty(searchParamsDTO.Adults))
            {
                if (!int.TryParse(searchParamsDTO.Adults, out int adults))
                {
                    return null;
                }

                source = source
                            .Where(x => x.RoomTypes
                            .Any(x => x.Adults >= adults));
            }

            if (!String.IsNullOrEmpty(searchParamsDTO.Children))
            {
                if (!int.TryParse(searchParamsDTO.Children, out int children))
                {
                    return null;
                }


                source = source
                            .Where(x => x.RoomTypes
                            .Any(x => x.Children >= children));
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

            IEnumerable<Property> filteredProperties = source.AsEnumerable();
            if (searchParamsDTO.Utilities != null &&
                searchParamsDTO.Utilities.Any())
            {
                //source = source
                //            .Where(x => searchParamsDTO.Utilities
                //                                            .IntersectBy(x.Utilities
                //                                            .Select(util => util.Id), id => id)
                //            .Count() == searchParamsDTO.Utilities.Count);
                //var src = source.ToList();
                //source = source
                //            .Where(x => x.Utilities.Count() > 0 &&
                //                        x.Utilities
                //            .Any(y => searchParamsDTO.Utilities
                //            .Contains(y.Id)));
                //source = source
                //            .Where(x => searchParamsDTO.Utilities
                //            .Any(id => x.Utilities
                //            .Any(y => y.Id == id)));
                filteredProperties = filteredProperties
                                            .Where(x => searchParamsDTO.Utilities
                                            .All(id => x.Utilities
                                            .Any(util => util.Id == id)))
                                            .ToList();
            }

            if (!String.IsNullOrEmpty(searchParamsDTO.Sort) &&
                Enum.TryParse(searchParamsDTO.Sort, out SortType sort))
            {
                switch (sort)
                {
                    case SortType.HighestPrice:
                        filteredProperties = filteredProperties.OrderByDescending(x => x.StartingPrice);
                        break;
                    case SortType.LowestPrice:
                        filteredProperties = filteredProperties.OrderBy(x => x.StartingPrice);
                        break;
                    case SortType.HighestRating:
                        filteredProperties = filteredProperties.OrderByDescending(x => x.AverageGrade);
                        break;
                    case SortType.LowestRating:
                        filteredProperties = filteredProperties.OrderBy(x => x.AverageGrade);
                        break;
                }
            }

            return Task.FromResult(filteredProperties);
        }

        public async Task<Property> GetFullPropertyById(Guid id)
        {
            Property property = await _dbContext
                                            .Properties
                                            .AsNoTracking()
                                            .Where(p => p.Id == id &&
                                                        p.IsVisible && 
                                                       !p.IsDeleted)
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
                                            .AsNoTracking()
                                            .Where(p => p.Id == id)                             
                                            .Include(u => u.User)
                                            .FirstOrDefaultAsync();
            return property;
        }

        public async Task<List<Property>> GetUserAccommodations(Guid userId)
        {
            List<Property> properties = await _dbContext
                                                    .Properties
                                                    .AsNoTracking()
                                                    .Where(p => p.UserId == userId)
                                                    .Include(p => p.ThumbnailImage)
                                                    .ToListAsync();
            return properties;
        }
    }
}
