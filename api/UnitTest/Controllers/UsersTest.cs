using Api.Controllers.Users;
using Api.Models.User;
using Infrastructure.Constants.Enums;
using Infrastructure.Infrastructure;
using Infrastructure.Pager;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace UnitTest.Controllers
{
    public class UsersTest: IClassFixture<InitFixture>
    {
        [Fact]
        public async Task PostTest()
        {
            using(var db = ContextFactory.GetRandomConfigContext())
            {
                db.Role.Add(new Db.Entities.Users.Role
                {
                    Name = "test",
                });
                db.SaveChanges();
                var model = new UserCreateViewModel
                {
                    Code = "0001",
                    Birthday = DateTime.Now,
                    Gender = EGender.Female,
                    Mobile = "13487895623",
                    Password = "123",
                    RealName = "啊打发",
                    RoleId = 1
                };
                var option = Options.Create(new PagerSetupOption
                {
                    StartPageIndex = 1,
                    DefaultPageSize = 10
                });
                var controller = new UsersController(db, new PagerService(option), new AesCipherService());
                await controller.Post(model);
                Assert.Equal(1, db.User.Count());
            }
        }
    }
}
