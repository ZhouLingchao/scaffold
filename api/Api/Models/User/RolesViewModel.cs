using Infrastructure.Pager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.User
{

    /// <summary>
    /// 角色列表
    /// </summary>
    public class RolesViewModel:PagerParams
    {
        /// <summary>
        /// 角色名称
        /// </summary>
        public string Name { get; set; }
    }
}
