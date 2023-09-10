using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class RoomTypeConfiguration : IEntityTypeConfiguration<RoomType>
    {
        public void Configure(EntityTypeBuilder<RoomType> builder)
        {
            builder.HasIndex(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasOne(x => x.Accommodation)
                   .WithMany(x => x.RoomTypes)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(x => x.Rooms)
                   .WithOne(x => x.RoomType)
                   .HasForeignKey(x => x.RoomTypeId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.SeasonalPricing)
                   .WithOne(x => x.RoomType)
                   .HasForeignKey(x => x.RoomTypeId)
                   .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
