using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    /// <summary>
    /// 默认帮助控制器，暂时只提供程序名称，环境变量
    /// </summary>
    [Route("api/[controller]")]
    public class EnvController : Controller
    {
        private readonly IHostingEnvironment _env;
        public EnvController(IHostingEnvironment env)
        {
            _env = env;
        }

        /// <summary>
        /// 获取应用名称，环境变量
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            var envs = new
            {
                _env.ApplicationName,
                _env.EnvironmentName,
            };
            return Json(envs);
        }
    }
}
