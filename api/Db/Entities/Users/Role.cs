using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Db.Entities.Users
{
    /// <summary>
    /// 角色类
    /// </summary>
    public class Role:PrimaryKey
    {
        /// <summary>
        /// 角色名称
        /// </summary>
        [Required,StringLength(64)]
        public string Name { get; set; }
        /// <summary>
        /// 此处与UserRoleRel表建立外键,删除Role时自动删除所有对应关系，防止代码处理时忘记
        /// </summary>
        public List<UserRoleRel> UserRoleRel { get; set; }

        public List<RoleFunctions> RoleFunctions { get; set; }
    }
}
