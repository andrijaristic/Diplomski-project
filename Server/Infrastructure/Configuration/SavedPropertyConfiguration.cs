using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class SavedPropertyConfiguration : IEntityTypeConfiguration<SavedProperty>
    {
        public void Configure(EntityTypeBuilder<SavedProperty> builder)
        {
            builder.HasIndex(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasOne(x => x.User)
                   .WithMany(x => x.SavedProperties);

            builder.HasOne(x => x.Property)
                   .WithMany(x => x.SavedProperties);
        }
    }
}
