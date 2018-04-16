using Infrastructure.Constants.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Mvc
{
    /// <summary>
    /// 通用的返回格式
    /// </summary>
    public class ResponseJsonModel
    {
        /// <summary>
        /// 返回code
        /// </summary>
        public EResponseCode Code { get; set; } = EResponseCode.Success;
        /// <summary>
        /// 信息
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// 返回数据
        /// </summary>
        public Object Data { get; set; }
    }
}
