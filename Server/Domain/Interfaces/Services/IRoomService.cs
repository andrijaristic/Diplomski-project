using Contracts.RoomDTOs;

namespace Domain.Interfaces.Services
{
    public interface IRoomService
    {
        Task<DisplayRoomDTO> CreateRoom(NewRoomDTO newRoomDTO, string username);
        Task<DisplayRoomDTO> UpdateRoom(Guid id, UpdateRoomDTO updateRoomDTO, string username);
        Task DeleteRoom(Guid id, string username);
        Task<List<DisplayRoomBookingDTO>> FilterRoomsForBooking(SearchRoomDTO searchRoomDTO);
        Task<List<DisplayRoomDTO>> GetRoomsForAccommodation(Guid accommodationId, string username);
    }
}
