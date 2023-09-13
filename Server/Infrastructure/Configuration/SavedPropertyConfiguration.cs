using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class SavedPropertyConfiguration : IEntityTypeConfiguration<SavedAccommodation>
    {
        public void Configure(EntityTypeBuilder<SavedAccommodation> builder)
        {
            builder.HasIndex(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasOne(x => x.User)
                   .WithMany(x => x.SavedAccommodations);

            builder.HasOne(x => x.Accommodation)
                   .WithMany(x => x.SavedAccommodations);
        }
    }
}
