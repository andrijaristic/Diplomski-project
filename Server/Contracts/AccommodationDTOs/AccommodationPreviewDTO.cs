using Contracts.AccommodationImageDTOs;

namespace Contracts.AccommodationDTOs
{
    public class AccommodationPreviewDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public string Area { get; set; }
        public int StartingPrice { get; set; }
        public AccommodationImageDTO ThumbnailImage { get; set; }
    }
}
