using Domain.Enums;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class SeasonalPricingConfiguration : IEntityTypeConfiguration<SeasonalPricing>
    {
        public void Configure(EntityTypeBuilder<SeasonalPricing> builder)
        {
            builder.HasIndex(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Season)
                   .HasConversion(
                        x => x.ToString(),
                        x => Enum.Parse<Season>(x)
                    );
        }
    }
}
