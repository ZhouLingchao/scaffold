using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.User
{
    /// <summary>
    /// 角色新建视图
    /// </summary>
    public class RoleCreateViewModel
    {
        /// <summary>
        /// 角色名称
        /// </summary>
        [Required, StringLength(64)]
        public string Name { get; set; }
        /// <summary>
        /// 角色对应的功能点列表
        /// </summary>
        public string[] Functions { get; set; }
    }
}
