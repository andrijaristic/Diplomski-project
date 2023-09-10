using Contracts.RoomTypeDTOs;

namespace Domain.Interfaces.Services
{
    public interface IRoomTypeService
    {
        Task<List<DisplayRoomTypeDTO>> GetRoomTypesForAccommodation(Guid accommodationId);
        Task<DisplayRoomTypeDTO> CreateRoomType(NewRoomTypeDTO newRoomTypeDTO, string username);
        Task<DisplayRoomTypeDTO> UpdateRoomType(Guid id, UpdateRoomTypeDTO updateRoomTypeDTO, string username);
        Task DeleteRoomType(Guid id, string username);
    }
}
