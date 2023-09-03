﻿using Domain.Enums;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class PropertyUtilityConfiguration : IEntityTypeConfiguration<PropertyUtility>
    {
        public void Configure(EntityTypeBuilder<PropertyUtility> builder)
        {
            builder.HasIndex(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Utility)
                    .HasConversion(
                                x => x.ToString(),
                                x => Enum.Parse<PropertyUtilities>(x)
                    );

            builder.HasMany(x => x.Properties)
                   .WithMany(x => x.Utilities);
        }
    }
}
