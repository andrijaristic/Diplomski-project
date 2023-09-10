using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    public interface IUnitOfWork
    {
        public IUserRepository Users { get; }
        public IAccommodationRepository Properties { get; }
        public IReservationRepository Reservations { get; }
        public IRoomRepository Rooms { get; }
        public IRoomTypeRepository RoomTypes { get; }
        public ICommentRepository Comments { get; }
        public IAmenityRepository PropertyUtilities { get; set; }
        public IReservedDaysRepository ReservedDays { get; }
        Task Save();
    }
}
