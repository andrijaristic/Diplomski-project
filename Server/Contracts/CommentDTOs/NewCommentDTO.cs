namespace Contracts.CommentDTOs
{
    public class NewCommentDTO
    {
        public Guid PropertyId { get; set; }
        public string Header { get; set; }
        public string Content { get; set; }
        public double Grade { get; set; }
    }
}
