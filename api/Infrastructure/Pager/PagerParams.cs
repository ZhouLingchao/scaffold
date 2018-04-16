using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Pager
{
    public class PagerParams
    {
        /// <summary>
        /// 分页索引
        /// </summary>
        public int? PageIndex { get; set; }
        /// <summary>
        /// 单页行数
        /// </summary>
        public int? PageSize { get; set; }

    }
}
