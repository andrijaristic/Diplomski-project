using Microsoft.AspNetCore.Http;
namespace Contracts.AccommodationDTOs
{
    public class NewAccommodationDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } 
        public string Description { get; set; }
        public string Country { get; set; }
        public string Area { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public List<Guid> Utilities { get; set; }   
        public Guid UserId { get; set; }
        public IFormFile ThumbnailImage { get; set; }
    }
}
