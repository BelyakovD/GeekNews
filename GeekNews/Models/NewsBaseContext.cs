using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace GeekNews.Models
{
    public partial class NewsBaseContext : IdentityDbContext<User>
    {
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<Section> Section { get; set; }
        public virtual DbSet<UserLikes> UserLikes { get; set; }

        public NewsBaseContext(DbContextOptions<NewsBaseContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<News>(entity =>
            {
                entity.HasOne(d => d.Section)
                    .WithMany(p => p.News)
                    .HasForeignKey(d => d.SectionId);
            });

            modelBuilder.Entity<Section>(entity =>
            {
                entity.Property(e => e.Url).IsRequired();
            });

            modelBuilder.Entity<News>()
                .HasMany(e => e.UserLikes)
                .WithOne(e => e.News)
                .HasForeignKey(e => e.NewsId);

            modelBuilder.Entity<User>()
                .HasMany(p => p.UserLikes)
                .WithOne(p => p.AspNetUsers)
                .HasForeignKey(p => p.UserId);
        }
    }
}
