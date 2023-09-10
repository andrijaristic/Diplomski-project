using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class ProjectDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Accommodation> Accommodations { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<SeasonalPricing> SeasonalPricings { get; set; }
        public DbSet<SavedProperty> SavedProperties { get; set; }
        public DbSet<ReservedDays> ReservedDays { get; set; }
        public DbSet<Amenity> PropertyUtilities { get; set; }

        public ProjectDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(ProjectDbContext).Assembly);
        }
    }
}
