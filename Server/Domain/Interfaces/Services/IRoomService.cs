using Contracts.RoomDTOs;

namespace Domain.Interfaces.Services
{
    public interface IRoomService
    {
        Task<DisplayRoomDTO> CreateRoom(NewRoomDTO newRoomDTO);
        Task<DisplayRoomDTO> UpdateRoom(Guid id, UpdateRoomDTO updateRoomDTO, string username);
        Task DeleteRoom(Guid id, string username);
    }
}
