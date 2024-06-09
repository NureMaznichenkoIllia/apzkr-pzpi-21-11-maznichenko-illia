using MetroNav.Models;
using Microsoft.EntityFrameworkCore;

namespace MetroNav
{
    public class AppContext : DbContext
    {
        public AppContext()
        {
            // Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        public DbSet<Station> Stations { get; set; }
        public DbSet<Platform> Platforms { get; set; }
        public DbSet<Line> Lines { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Staff> Staffs { get; set; }
        public DbSet<Train> Trains { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=MetroNav;Trusted_Connection=True");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
