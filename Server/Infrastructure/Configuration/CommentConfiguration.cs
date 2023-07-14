using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

            builder.HasOne(x => x.Property)
                   .WithMany(x => x.Comments)
                   .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
