using Domain.Enums;
using Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.HasIndex(x => x.Username).IsUnique();

            builder.Property(x => x.Role)
                   .HasConversion(
                            x => x.ToString(),
                            x => Enum.Parse<UserType>(x)
                    );

            builder.Property(x => x.VerificationStatus)
                   .HasConversion(
                            x => x.ToString(),
                            x => Enum.Parse<VerificationStatus>(x)
                    );

            builder.HasMany(x => x.Comments)
                   .WithOne(x => x.User)
                   .HasForeignKey(x => x.UserId)
                   .OnDelete(DeleteBehavior.NoAction);

            builder.HasMany(x => x.Properties)
                   .WithOne(x => x.User)
                   .HasForeignKey(x => x.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Reservations)
                   .WithOne(x => x.User)
                   .HasForeignKey(x => x.UserId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(x => x.SavedProperties)
                   .WithOne(x => x.User)
                   .HasForeignKey(x => x.UserId)
                   .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
