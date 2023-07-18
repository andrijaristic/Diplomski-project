using Domain.Enums;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata.Conventions.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Configuration
{
    public class PropertyConfiguration : IEntityTypeConfiguration<Property>
    {
        public void Configure(EntityTypeBuilder<Property> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Name).IsRequired();

            builder.Property(x => x.Description).IsRequired();

            builder.Property(x => x.AverageGrade).HasPrecision(1, 2);

            builder.Property(x => x.VerificationStatus)
                   .HasConversion(
                            x => x.ToString(),
                            x => Enum.Parse<VerificationStatus>(x)
                    );

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
