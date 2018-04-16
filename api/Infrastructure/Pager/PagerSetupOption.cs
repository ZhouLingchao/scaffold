using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Pager
{
    /// <summary>
    /// 分页服务预设配置项
    /// </summary>
    public class PagerSetupOption
    {
        /// <summary>
        /// 分页下标，默认为0
        /// 即 分页时PageIndex = 0 时表示实际的第一页
        /// </summary>
        public int StartPageIndex { get; set; } = 0;

        /// <summary>
        /// 默认每页行数，预设为0
        /// </summary>
        public int DefaultPageSize { get; set; } = 10;

    }
}
