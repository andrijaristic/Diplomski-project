using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class ReservedDaysConfiguration : IEntityTypeConfiguration<ReservedDays>
    {
        public void Configure(EntityTypeBuilder<ReservedDays> builder)
        {
            builder.HasIndex(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasOne(x => x.Room)
                   .WithMany(x => x.OccupiedDates);
        }
    }
}
