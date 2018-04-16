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
        Normal = 10,
        /// <summary>
        /// 冻结
        /// </summary>
        Fozen = 20,
        /// <summary>
        /// 审核中
        /// </summary>
        Verifying = 21,
        /// <summary>
        /// 删除
        /// </summary>
        Deleted = 30,
        /// <summary>
        /// 黑名单
        /// </summary>
        Blacklist = 31
    }
}
