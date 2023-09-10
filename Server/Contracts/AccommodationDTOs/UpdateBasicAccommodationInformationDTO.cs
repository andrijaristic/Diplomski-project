namespace Contracts.AccommodationDTOs
{
    public class UpdateBasicAccommodationInformationDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid UserId { get; set; }
    }
}
