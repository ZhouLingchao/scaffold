using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.User
{
    /// <summary>
    /// 角色编辑
    /// </summary>
    public class RoleUpdateViewModel:RoleCreateViewModel
    {
        /// <summary>
        /// 角色id
        /// </summary>
        public long Id { get; set; }
    }
}
