using Db;
using Db.Entities.Users;
using Infrastructure.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Microsoft.AspNetCore.Hosting
{
    public static class DataSeederExtenstion
    {
        public static IWebHost SeedData(this IWebHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                DataSeeder.Seed(services);
            }
            return host;
        }

    }
    public static class DataSeeder
    {
        public static void Seed(IServiceProvider services)
        {
            var context = services.GetService<ApiDbContext>();
            var cipher = services.GetService<ICipherService>();
            if (!context.User.Any())
            {
                var guid = Guid.NewGuid().ToString();

                var user = new User
                {
                    Code = "admin",
                    RealName = "超级管理员",
                    SecuritySeed = guid,
                    Password = cipher.Encrypt("admin", guid)
                };
                var role = new Role
                {
                    Name = "所有权限"
                };

                var roleFunc = new List<RoleFunctions>
                {
                    new RoleFunctions{ Role = role,FunctionCode = "manage/role"},
                    new RoleFunctions{ Role = role,FunctionCode = "manage/user"}
                };
                var userRole = new UserRoleRel{ Role = role,User = user};

                context.AddRange(roleFunc);
                context.Add(userRole);
                context.SaveChanges();
            }
        }
    }
}
