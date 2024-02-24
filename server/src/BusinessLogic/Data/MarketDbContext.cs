using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace BusinessLogic.Data
{
    public class MarketDbContext(DbContextOptions<MarketDbContext> options) : DbContext(options)
    {
        public DbSet<Product>? Products { get; set; }
        public DbSet<Brand>? Brands { get; set; }
        public DbSet<Category>? Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}