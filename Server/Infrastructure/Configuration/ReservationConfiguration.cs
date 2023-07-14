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
    public class ReservationConfiguration : IEntityTypeConfiguration<Reservation>
    {
        public void Configure(EntityTypeBuilder<Reservation> builder)
        {
            builder.HasIndex(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.Price).HasPrecision(4, 2);

            builder.HasOne(x => x.User)
                   .WithMany(x => x.Reservations);

            builder.HasOne(x => x.Property)
                   .WithMany(x => x.Reservations);

            builder.HasOne(x => x.Room)
                   .WithMany(x => x.Reservations);
        }
    }
}
