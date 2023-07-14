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
