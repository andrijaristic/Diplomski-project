using Contracts.AccommodationImageDTOs;

namespace Contracts.AccommodationDTOs
{
    public class DisplayAccommodationDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double AverageGrade { get; set; }
        public int Comments { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public bool IsSaved { get; set; }
        public double StartingPrice { get; set; }
        public AccommodationImageDTO ThumbnailImage { get; set; }
    }
}
