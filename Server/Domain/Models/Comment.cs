﻿namespace Domain.Models
{
    public class Comment
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid AccommodationId { get; set; }
        public Accommodation Accommodation { get; set; }
        public string UserFullName { get; set; }
        public string Header { get; set; }
        public string Content { get; set; }
        public double Grade { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
