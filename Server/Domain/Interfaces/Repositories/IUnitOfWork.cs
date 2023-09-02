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
        public IPropertyRepository Properties { get; }
        public IReservationRepository Reservations { get; }
        public IRoomRepository Rooms { get; }
        public IRoomTypeRepository RoomTypes { get; }
        public ICommentRepository Comments { get; }
        Task Save();
    }
}
