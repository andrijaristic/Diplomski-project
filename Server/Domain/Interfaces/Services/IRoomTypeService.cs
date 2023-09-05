using Contracts.RoomTypeDTOs;

namespace Domain.Interfaces.Services
{
    public interface IRoomTypeService
    {
        Task<List<DisplayRoomTypeDTO>> GetRoomTypesForAccommodation(Guid accommodationId, string username);
        Task<DisplayRoomTypeDTO> CreateRoomType(NewRoomTypeDTO newRoomTypeDTO);
        Task<DisplayRoomTypeDTO> UpdateRoomType(Guid id, UpdateRoomTypeDTO updateRoomTypeDTO, string username);
        Task DeleteRoomType(Guid id, string username);
    }
}
