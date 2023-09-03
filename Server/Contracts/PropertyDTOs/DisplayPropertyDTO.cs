using Contracts.AccommodationImageDTOs;

namespace Contracts.PropertyDTOs
{
    public class DisplayPropertyDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double AverageGrade { get; set; }
        public int RatingsAmount { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public AccommodationImageDTO ThumbnailImage { get; set; }  
    }
}
