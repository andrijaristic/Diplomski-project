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

            builder.HasOne(x => x.User)
                   .WithMany(x => x.Properties)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(x => x.Comments)
                   .WithOne(x => x.Property)
                   .HasForeignKey(x => x.PropertyId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Rooms)
                   .WithOne(x => x.Property)
                   .HasForeignKey(x => x.PropertyId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.RoomTypes)
                   .WithOne(x => x.Property)
                   .HasForeignKey(x => x.PropertyId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Reservations)
                   .WithOne(x => x.Property)
                   .HasForeignKey(x => x.PropertyId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.SavedProperties)
                   .WithOne(x => x.Property)
                   .HasForeignKey(x => x.PropertyId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Utilities)
                   .WithMany(x => x.Properties);
        }
    }
}
