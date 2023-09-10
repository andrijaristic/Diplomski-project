using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    public interface IRoomTypeRepository : IGenericRepository<RoomType>
    {
        Task<RoomType> FindDetailedRoomType(Guid id);
        Task<List<RoomType>> FindRoomTypesForAccommodation(Guid accommodationId);
    }
}
