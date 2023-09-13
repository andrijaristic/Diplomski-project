using Domain.Enums;

namespace Domain.Models
{
    public class Amenity
    {
        public Guid Id { get; set; }
        public AccommodationAmenities AccommodationAmenity { get; set; }
        public List<Accommodation> Accommodations { get; set; }
    }
}
