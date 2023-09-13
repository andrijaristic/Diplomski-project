using Contracts.RoomDTOs;
using Domain.Models;

namespace Domain.Interfaces.Repositories
{
    public interface IRoomRepository : IGenericRepository<Room>
    {
        Task<Room> FindDetailedRoom(Guid id, Guid propertyId, DateTime date);
        Task<Room> FindByIdAndAccommodation(Guid roomId, Guid accommodationId);
        Task<List<Room>> FilterRooms(SearchRoomDTO searchRoomDTO);
        Task<List<Room>> GetForAccommodation(Guid accommodationId, DateTime date);
    }
}
