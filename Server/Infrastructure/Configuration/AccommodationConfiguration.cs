using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class AccommodationConfiguration : IEntityTypeConfiguration<Accommodation>
    {
        public void Configure(EntityTypeBuilder<Accommodation> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Name).IsRequired();

            builder.Property(x => x.Description).IsRequired();

            builder.Property(x => x.AverageGrade).HasPrecision(1, 2);

            builder.Property(x => x.AverageGrade).HasDefaultValue(1);

            builder.HasOne(x => x.User)
                   .WithMany(x => x.Accommodations)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(x => x.Comments)
                   .WithOne(x => x.Accommodation)
                   .HasForeignKey(x => x.AccommodationId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Rooms)
                   .WithOne(x => x.Accommodation)
                   .HasForeignKey(x => x.AccommodationId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.RoomTypes)
                   .WithOne(x => x.Accommodation)
                   .HasForeignKey(x => x.AccommodationId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Reservations)
                   .WithOne(x => x.Accommodation)
                   .HasForeignKey(x => x.AccommodationId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.SavedAccommodations)
                   .WithOne(x => x.Accommodation)
                   .HasForeignKey(x => x.AccommodationId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Amenities)
                   .WithMany(x => x.Accommodations);
        }
    }
}
