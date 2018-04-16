using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.User
{
    /// <summary>
    /// 用户登录视图
    /// </summary>
    public class LoginViewModel
    {
        /// <summary>
        /// 账号名称
        /// </summary>
        [Required]
        public string Account { get; set; }
        /// <summary>
        /// 账号密码
        /// </summary>
        [Required]
        public string Password { get; set; }
    }
}
