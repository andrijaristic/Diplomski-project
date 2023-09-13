namespace Contracts.CommentDTOs
{
    public class NewCommentDTO
    {
        public Guid AccommodationId { get; set; }
        public string Header { get; set; }
        public string Content { get; set; }
        public double Grade { get; set; }
    }
}
