using Contracts.AmenityDTOs;

namespace Domain.Interfaces.Services
{
    public interface IAmenityService
    {
        Task<List<DisplayAmenityDTO>> GetAll();
    }
}
