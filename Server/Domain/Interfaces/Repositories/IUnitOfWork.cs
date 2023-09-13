namespace Domain.Interfaces.Repositories
{
    public interface IUnitOfWork
    {
        public IUserRepository Users { get; }
        public IAccommodationRepository Accommodations { get; }
        public IReservationRepository Reservations { get; }
        public IRoomRepository Rooms { get; }
        public IRoomTypeRepository RoomTypes { get; }
        public ICommentRepository Comments { get; }
        public IAmenityRepository Amenities { get; set; }
        public IReservedDaysRepository ReservedDays { get; }
        public IAccommodationImageRepository AccommodationImages { get; }
        Task Save();
    }
}
