using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using InstructionIO.Models;

namespace InstructionIO.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        public DbSet<UserInfo> UserInfos { get; set; }
        public DbSet<Instruction> Instructions { get; set; }
        public DbSet<Step> Steps { get; set; }
        public DbSet<ContentBlock> ContentBlocks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<TagsRelation> TagsRelations { get; set; }
        public DbSet<Category> Categorys { get; set; }

        internal object SingleOrDefault(Func<object, bool> p)
        {
            throw new NotImplementedException();
        }
    }
}
