using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.HasIndex(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasOne(x => x.User)
                   .WithMany(x => x.Comments)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(x => x.Accommodation)
                   .WithMany(x => x.Comments)
                   .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
