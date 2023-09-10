using Domain.Interfaces.Repositories;

namespace Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ProjectDbContext _dbContext;
        public IUserRepository Users { get; set; }
        public IAccommodationRepository Properties { get; set; }
        public IReservationRepository Reservations { get; set; }
        public IRoomRepository Rooms { get; set; }
        public IRoomTypeRepository RoomTypes { get; set; }
        public ICommentRepository Comments { get; }
        public IAmenityRepository PropertyUtilities { get; set; }
        public IReservedDaysRepository ReservedDays { get; set; }

        public UnitOfWork(ProjectDbContext dbContext,
                          IUserRepository users,
                          IAccommodationRepository properties,
                          IReservationRepository reservations,
                          IRoomRepository rooms,
                          IRoomTypeRepository roomTypes,
                          ICommentRepository comments,
                          IAmenityRepository propertyUtilities,
                          IReservedDaysRepository reservedDays)
        {
            _dbContext = dbContext;
            Users = users;
            Properties = properties;
            Reservations = reservations;
            Rooms = rooms;
            RoomTypes = roomTypes;
            Comments = comments;
            PropertyUtilities = propertyUtilities;
            ReservedDays = reservedDays;
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
