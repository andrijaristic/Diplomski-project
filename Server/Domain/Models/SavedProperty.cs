namespace Domain.Models
{
    public class SavedProperty
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid PropertyId { get; set; }
        public Accommodation Property { get; set; }
    }
}
