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
    public class RoomConfiguration : IEntityTypeConfiguration<Room>
    {
        public void Configure(EntityTypeBuilder<Room> builder)
        {
            builder.HasIndex(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasOne(x => x.Property)
                   .WithMany(x => x.Rooms)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.HasOne(x => x.RoomType)
                   .WithMany(x => x.Rooms)
                   .HasForeignKey(x => x.RoomTypeId)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(x => x.OccupiedDates)
                   .WithOne(x => x.Room)
                   .HasForeignKey(x => x.RoomId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Reservations)
                   .WithOne(x => x.Room)
                   .HasForeignKey(x => x.RoomId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
