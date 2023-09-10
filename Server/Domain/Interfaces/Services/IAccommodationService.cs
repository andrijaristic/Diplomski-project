
using Contracts.AccommodationDTOs;
using Contracts.Common;

namespace Domain.Interfaces.Services
{
    public interface IAccommodationService
    {
        Task<PagedListDTO<DisplayAccommodationDTO>> GetAccommodations(SearchParamsDTO searchParamsDTO, string username);
        Task<List<AccommodationPreviewDTO>> GetHighestRatedAccommodations();
        Task<List<DisplayAccommodationDTO>> GetUserAccommodations(Guid userId);
        Task<DisplayAccommodationDTO> CreateAccommodation(NewAccommodationDTO newPropertyDTO, string username);
        Task<DisplayAccommodationDTO> UpdateBasicAccommodationInformation(Guid id, UpdateBasicAccommodationInformationDTO updatePropertyDTO, string username);
        Task DeleteAccommodation(Guid id, string username);
        Task<DetailedAccommodationDTO> GetById(Guid id);
        Task<DetailedAccommodationDTO> AddAccommodationImage(Guid id, AddAccommodationImageDTO addPropertyImageDTO, string username);
        Task ToggleAccommodationFavoriteStatus(Guid accommodationId, string username);
    }
}
