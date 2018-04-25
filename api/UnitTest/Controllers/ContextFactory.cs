using Db;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace UnitTest.Controllers
{
    public class ContextFactory
    {
        public static ApiDbContext GetRandomConfigContext()
        {
            var options = new DbContextOptionsBuilder<ApiDbContext>().UseInMemoryDatabase(Guid.NewGuid().ToString());
            return new ApiDbContext(options.Options);
        }
    }
}
