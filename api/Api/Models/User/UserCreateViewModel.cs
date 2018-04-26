using Infrastructrue.Constants.Enums;
using Infrastructure.Oo;
using System;
using System.ComponentModel.DataAnnotations;

namespace Api.Models.User
{
    /// <summary>
    /// 用户新建
    /// </summary>
    [DestinationType(typeof(Db.Entities.Users.User))]
    public class UserCreateViewModel
    {
        /// <summary>
        /// 用户编码，账号
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
        /// 性别 <seealso cref="EGender"/>
        /// </summary>
        public EGender Gender { get; set; } = EGender.Unknown;
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
        [Required, StringLength(64)]
        public string Password { get; set; }
        /// <summary>
        /// 角色ID
        /// </summary>
        public long RoleId { get; set; }
    }
}
