using Contracts.Common;
using Domain.Enums;
using Domain.Interfaces.Repositories;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class AccommodationRepository : GenericRepository<Accommodation>, IAccommodationRepository
    {
        public AccommodationRepository(ProjectDbContext _dbContext) : base(_dbContext)
        {

        }

        public async Task<List<Accommodation>> GetUserFavorites(Guid userId)
        {
            IEnumerable<Accommodation> accommodations =  _dbContext
                                                            .Accommodations
                                                            .AsNoTracking()
                                                            .Where(x => x.IsVisible &&
                                                                       !x.IsDeleted)
                                                            .Include(x => x.SavedAccommodations
                                                            .Where(y => y.UserId == userId))
                                                            .Include(x => x.ThumbnailImage)
                                                            .Include(x => x.Comments)
                                                            .AsEnumerable();
            return  accommodations
                            .Where(x => x.SavedAccommodations
                            .Any(y => y.UserId == userId))
                            .ToList();
        }

        public async Task<Accommodation> GetWithFavorites(Guid id)
        {
            Accommodation accommodation = await _dbContext
                                                    .Accommodations
                                                    .Where(p => p.Id == id &&
                                                                p.IsVisible &&
                                                               !p.IsDeleted)
                                                    .Include(p => p.SavedAccommodations)
                                                    .FirstOrDefaultAsync();
            return accommodation;
        }

        public async Task<List<Accommodation>> GetHighestRatedAccommodations()
        {
            List<Accommodation> accommodations = await _dbContext
                                                            .Accommodations
                                                            .AsNoTracking()
                                                            .Where(p => p.IsVisible &&
                                                                       !p.IsDeleted)
                                                            .OrderBy(p => p.AverageGrade)
                                                            .Take(5)
                                                            .Include(p => p.ThumbnailImage)
                                                            .ToListAsync();
            return accommodations;
        }

        public async Task<Accommodation> GetWithRooms(Guid id)
        {
            Accommodation accommodation = await _dbContext
                                                    .Accommodations
                                                    .AsNoTracking()
                                                    .Where(p => p.Id == id && !p.IsDeleted)
                                                    .Include(p => p.Rooms
                                                    .Where(r => !r.IsDeleted))
                                                    .FirstOrDefaultAsync();
            return accommodation;
        }

        public Task<IEnumerable<Accommodation>> GetFilteredAcccommodations(SearchParamsDTO searchParamsDTO)
        {
            var source = _dbContext
                            .Accommodations
                            .AsNoTracking()
                            .Where(p => p.IsVisible &&
                                       !p.IsDeleted)
                            .Include(p => p.Rooms
                            .Where(r => !r.IsDeleted))
                            .Include(p => p.RoomTypes)
                            .Include(p => p.Amenities)
                            .Include(p => p.ThumbnailImage)
                            .Include(p => p.SavedAccommodations)
                            .Include(p => p.Comments)
                            .OrderByDescending(p => p.StartingPrice)
                            .AsQueryable();

            var src1 = source.ToList();

            if (!String.IsNullOrEmpty(searchParamsDTO.ArrivalDate))
            {
                if (!DateTime.TryParse(searchParamsDTO.ArrivalDate, out DateTime arrivalDate))
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

            IEnumerable<Accommodation> filteredProperties = source.AsEnumerable();
            if (searchParamsDTO.Amenities != null &&
                searchParamsDTO.Amenities.Any())
            {
                filteredProperties = filteredProperties
                                            .Where(x => searchParamsDTO.Amenities
                                            .All(id => x.Amenities
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

        public async Task<Accommodation> GetFullAccommodationById(Guid id)
        {
            Accommodation property = await _dbContext
                                            .Accommodations
                                            .Where(p => p.Id == id &&
                                                        p.IsVisible &&
                                                       !p.IsDeleted)
                                            .Include(p => p.Comments)
                                            .Include(p => p.ThumbnailImage)
                                            .Include(p => p.Images)
                                            .Include(p => p.Amenities)
                                            .FirstOrDefaultAsync();
            return property;
        }

        public async Task<Accommodation> GetAccommodationWithOwner(Guid id)
        {
            Accommodation accommodation = await _dbContext
                                                    .Accommodations
                                                    .AsNoTracking()
                                                    .Where(p => p.Id == id)
                                                    .Include(u => u.User)
                                                    .FirstOrDefaultAsync();
            return accommodation;
        }

        public async Task<List<Accommodation>> GetUserAccommodations(Guid userId)
        {
            List<Accommodation> accommodations = await _dbContext
                                                            .Accommodations
                                                            .AsNoTracking()
                                                            .Where(p => p.UserId == userId &&
                                                                       !p.IsDeleted)
                                                            .Include(p => p.ThumbnailImage)
                                                            .ToListAsync();
            return accommodations;
        }
    }
}
