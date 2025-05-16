using Data.mapping;
using Entity;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class ApplicatonDbContext : DbContext
    {
        public ApplicatonDbContext(DbContextOptions<ApplicatonDbContext> options) : base(options)
        {
        }

        public DbSet<Tasks> Tasks { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new TaskMap());
        }

    }
}