using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.AppSettings
{
    /// <summary>
    /// redis配置项
    /// </summary>
    public class RedisOption
    {
        /// <summary>
        /// 连接到redis服务器的配置信息
        /// </summary>
        public string Configuration { get; set; }
        /// <summary>
        /// 实例名称
        /// </summary>
        public string InstanceName { get; set; }
    }
}
