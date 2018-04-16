using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.AppSettings
{
    /// <summary>
    /// 对应appsettings.json配置文件中AppOption字段
    /// </summary>
    public class AppOption
    {
        /// <summary>
        /// 连接到数据库的配置信息
        /// </summary>
        public string Configuration { get; set; }
        /// <summary>
        /// 版本号，提供默认版本号为1.0.0
        /// </summary>
        public string Version { get; set; } = "1.0.0";
        /// <summary>
        /// Swagger的json地址
        /// </summary>
        public string SwaggerJsonUrl { get; set; }
    }
}
