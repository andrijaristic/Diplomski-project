using Domain.Interfaces.Repositories;

namespace Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ProjectDbContext _dbContext;
        public IUserRepository Users { get; set; }
        public IAccommodationRepository Accommodations { get; set; }
        public IReservationRepository Reservations { get; set; }
        public IRoomRepository Rooms { get; set; }
        public IRoomTypeRepository RoomTypes { get; set; }
        public ICommentRepository Comments { get; }
        public IAmenityRepository Amenities { get; set; }
        public IReservedDaysRepository ReservedDays { get; set; }
        public IAccommodationImageRepository AccommodationImages { get; set; }

        public UnitOfWork(ProjectDbContext dbContext,
                          IUserRepository users,
                          IAccommodationRepository accommodations,
                          IReservationRepository reservations,
                          IRoomRepository rooms,
                          IRoomTypeRepository roomTypes,
                          ICommentRepository comments,
                          IAmenityRepository amenities,
                          IReservedDaysRepository reservedDays,
                          IAccommodationImageRepository accommodationImages)
        {
            _dbContext = dbContext;
            Users = users;
            Accommodations = accommodations;
            Reservations = reservations;
            Rooms = rooms;
            RoomTypes = roomTypes;
            Comments = comments;
            Amenities = amenities;
            ReservedDays = reservedDays;
            AccommodationImages = accommodationImages;
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
