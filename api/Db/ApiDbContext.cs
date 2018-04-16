using Db.Entities.Users;
using Microsoft.EntityFrameworkCore;

namespace Db
{
    /// <summary>
    /// 数据库上下文
    /// </summary>
    public class ApiDbContext:DbContext
    {
        /// <summary>
        /// 默认构造函数
        /// </summary>
        public ApiDbContext() { }
        /// <summary>
        /// 用于单元测试的构造函数
        /// </summary>
        /// <param name="options"></param>
        public ApiDbContext(DbContextOptions options) : base(options)
        {
        }
        /// <summary>
        /// 配置数据库表约束等
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
        /// <summary>
        /// 用户信息，包含账户信息
        /// </summary>
        public DbSet<User> User { get; set; }
        /// <summary>
        /// 角色信息
        /// </summary>
        public DbSet<Role> Role { get; set; }
        /// <summary>
        /// 用户角色 匹配表，用户角色多对多
        /// </summary>
        public DbSet<UserRoleRel> UserRoleRel { get; set; }
        /// <summary>
        /// 角色功能表，角色对应多个功能
        /// </summary>
        public DbSet<RoleFunctions> RoleFunctions { get; set; }
    }
}
