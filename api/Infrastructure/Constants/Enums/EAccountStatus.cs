using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Constants.Enums
{
    /// <summary>
    /// 账号状态,
    ///     1* ： 账号可以正常使用,
    ///     2* ： 账号暂时无法使用，但可以恢复
    ///     3* ： 账号删除，无法恢复
    /// </summary>
    public enum EAccountStatus
    {
        /// <summary>
        /// 正常
        /// </summary>
        正常 = 10,
        /// <summary>
        /// 冻结
        /// </summary>
        冻结 = 20,
        /// <summary>
        /// 审核中
        /// </summary>
        审核中 = 21,
        /// <summary>
        /// 删除
        /// </summary>
        删除 = 30,
        /// <summary>
        /// 黑名单
        /// </summary>
        黑名单 = 31
    }
}
