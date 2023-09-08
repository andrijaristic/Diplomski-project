using Contracts.RoomDTOs;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    public interface IRoomRepository : IGenericRepository<Room>
    {
        Task<Room> FindDetailedRoom(Guid id);
        Task<Room> FindByIdAndProperty(Guid roomId, Guid propertyId);
        Task<List<Room>> FilterRooms(SearchRoomDTO searchRoomDTO);
        Task<List<Room>> GetForAccommodation(Guid accommodationId, DateTime date);
    }
}
