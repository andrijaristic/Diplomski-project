using Domain.Models;

namespace Domain.Interfaces.Repositories
{
    public interface IRoomTypeRepository : IGenericRepository<RoomType>
    {
        Task<RoomType> FindDetailedRoomType(Guid id);
        Task<List<RoomType>> FindRoomTypesForAccommodation(Guid accommodationId);
    }
}
