using Infrastructure.Constants.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Db.Entities.Users
{
    /// <summary>
    /// 用户表, 对应实际用户
    /// </summary>
    public class User:PrimaryKey
    {
        /// <summary>
        /// 用户账号,编号
        /// </summary>
        [Required,StringLength(64)]
        public string Code { get; set; }
        /// <summary>
        /// 真实姓名
        /// </summary>
        [Required, StringLength(64)]
        public string RealName { get; set; }
        /// <summary>
        /// 生日
        /// </summary>
        public DateTime Birthday { get; set; }
        /// <summary>
        /// 性别
        /// </summary>
        [Required]
        public EGender Gender { get; set; }
        /// <summary>
        /// 手机号
        /// </summary>
        [StringLength(16)]
        public string Mobile { get; set; }
        /// <summary>
        /// 电子邮箱
        /// </summary>
        [StringLength(128)]
        public string EMail { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        [Required, StringLength(256)]
        public string Password { get; set; }
        /// <summary>
        /// 密码加密种子,提供一个Guid默认值
        /// </summary>
        [Required, StringLength(64)]
        public string SecuritySeed { get; set; } = Guid.NewGuid().ToString();
        /// <summary>
        /// 账号状态
        /// </summary>
        [Required]
        public EAccountStatus AccountStatus { get; set; } = EAccountStatus.正常;
        /// <summary>
        /// 按逻辑用户表不允许直接删除
        /// 增加此外键以防万一
        /// </summary>
        public List<UserRoleRel> UserRoleRel { get; set; }
    }
}
