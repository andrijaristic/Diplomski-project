using Microsoft.AspNetCore.Http;
namespace Contracts.AccommodationDTOs
{
    public class AddAccommodationImageDTO
    {
        public Guid UserId { get; set; }
        public IFormFile Image { get; set; }
    }
}
