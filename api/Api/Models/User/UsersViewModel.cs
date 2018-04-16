using Infrastructure.Pager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.User
{
    /// <summary>
    /// 用户列表
    /// </summary>
    public class UsersViewModel:PagerParams
    {
        /// <summary>
        /// 账号
        /// </summary>
        public string Account { get; set; }
    }
}
