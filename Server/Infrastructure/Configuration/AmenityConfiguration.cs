using Domain.Enums;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class AmenityConfiguration : IEntityTypeConfiguration<Amenity>
    {
        public void Configure(EntityTypeBuilder<Amenity> builder)
        {
            builder.HasIndex(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.AccommodationAmenity)
                    .HasConversion(
                                x => x.ToString(),
                                x => Enum.Parse<AccommodationAmenities>(x)
                    );

            builder.HasMany(x => x.Accommodations)
                   .WithMany(x => x.Amenities);
        }
    }
}
