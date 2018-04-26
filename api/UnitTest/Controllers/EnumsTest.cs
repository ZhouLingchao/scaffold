using Infrastructrue.Constants.Enums;
using Api.Controllers.Common;
using Infrastructure.Infrastructure;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Microsoft.AspNetCore.Mvc;

namespace UnitTest.Controllers
{
    public class EnumsTest: IClassFixture<InitFixture>
    {
        [Fact]
        public async Task GetEnumsValue()
        {
            var con = new EnumsController(new NullDistributedCache());
            IActionResult rs = await con.Get(nameof(EGender));
            //Assert.Equal((int)EResponseCode.Success, Convert.ToInt32(obj["code"]));
            //Assert.Equal((int)EGender.Female, Convert.ToInt32(obj["data"][0]["value"]));
        }
    }
}
