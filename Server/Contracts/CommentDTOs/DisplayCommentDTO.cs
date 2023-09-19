namespace Contracts.CommentDTOs
{
    public class DisplayCommentDTO
    {
        public Guid Id { get; set; }
        public Guid AccommodationId { get; set; }
        public string AccommodationName { get; set; }
        public string UserFullName { get; set; }
        public string Header { get; set; }
        public string Content { get; set; }
        public double Grade { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
