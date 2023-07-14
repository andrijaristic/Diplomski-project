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
    public class PropertyUtilityConfiguration : IEntityTypeConfiguration<PropertyUtility>
    {
        public void Configure(EntityTypeBuilder<PropertyUtility> builder)
        {
            builder.HasIndex(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasMany(x => x.Properties)
                   .WithMany(x => x.Utilities);
        }
    }
}
