using Contracts.AccommodationImageDTOs;
using Contracts.CommentDTOs;
using Contracts.PropertyUtilityDTOs;
using Contracts.RoomTypeDTOs;

namespace Contracts.AccommodationDTOs
{
    public class DetailedAccommodationDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; } 
        public double AverageGrade { get; set; }    
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public AccommodationImageDTO ThumbnailImage { get; set; }
        public List<PropertyUtilityDTO> Utilities { get; set; }
        public List<AccommodationImageDTO> Images { get; set; }
        public List<DisplayCommentDTO> Comments { get; set; }
        public List<DisplayRoomTypeDTO> RoomTypes { get; set; }
        public int StartingPrice { get; set; }
    }
}
