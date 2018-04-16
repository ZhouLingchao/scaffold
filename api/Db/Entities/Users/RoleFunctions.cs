using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Db.Entities.Users
{
    /// <summary>
    /// 角色拥有的所有功能点
    /// 只记录功能点code,采用前台维护完整功能的方式
    /// 方便功能迁移，去掉不必要的手动插入数据操作
    /// </summary>
    public class RoleFunctions:PrimaryKey
    {
        public Role Role { get; set; }
        /// <summary>
        /// 角色拥有的功能点编码
        /// </summary>
        [Required,StringLength(128)]
        public string FunctionCode { get; set; }
    }
}
