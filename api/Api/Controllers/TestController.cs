using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class TestController : Controller
    {
        /// <summary>
        /// 仅用于测试的接口，勿用
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            return Json(new
            {
                Authorize = true
            });
        }

        [HttpPost]
        public async Task Put()
        {

        }
    }
}
