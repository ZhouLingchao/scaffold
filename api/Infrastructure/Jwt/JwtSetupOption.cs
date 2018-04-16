using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Jwt
{
    public class JwtSetupOption
    {
        /// <summary>
        /// 发行人
        /// </summary>
        public string Issuer { get; set; }
        /// <summary>
        /// 观众
        /// </summary>
        public string Audience { get; set; }

        /// <summary>
        /// 获取分钟数
        /// </summary>
        public int ExpireMinuites { get; set; }
        /// <summary>
        /// 加密字符串
        /// </summary>
        public string SigningKey { get; set; }
    }
}
