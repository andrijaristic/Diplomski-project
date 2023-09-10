using Contracts.Common;
using Contracts.PropertyDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Services
{
    public interface IPropertyService
    {
        Task<PagedListDTO<DisplayPropertyDTO>> GetAccommodations(SearchParamsDTO searchParamsDTO, string username);
        Task<List<PropertyPreviewDTO>> GetHighestRatedAccommodations();
        Task<List<DisplayPropertyDTO>> GetUserAccommodations(Guid userId);
        Task<DisplayPropertyDTO> CreateProperty(NewPropertyDTO newPropertyDTO, string username);
        Task<DisplayPropertyDTO> UpdateBasicPropertyInformation(Guid id, UpdateBasicPropertyInformationDTO updatePropertyDTO, string username);
        Task DeleteProperty(Guid id, string username);
        Task<DetailedPropertyDTO> GetById(Guid id);
        Task<DetailedPropertyDTO> AddPropertyImage(Guid id, AddPropertyImageDTO addPropertyImageDTO, string username);
        Task ToggleAccommodationFavoriteStatus(Guid accommodationId, string username);
    }
}
