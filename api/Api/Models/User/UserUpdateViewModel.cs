using Infrastructure.Constants.Enums;
using Infrastructure.Oo;
using System.ComponentModel.DataAnnotations;

namespace Api.Models.User
{
    /// <summary>
    /// 用户编辑
    /// </summary>
    [DestinationType(typeof(Db.Entities.Users.User))]
    public class UserUpdateViewModel:UserCreateViewModel
    {
        /// <summary>
        /// 主键
        /// </summary>
        [Required]
        public long Id { get; set; }
        /// <summary>
        /// 账号状态
        /// </summary>
        [Required]
        public EAccountStatus? AccountStatus { get; set; }
    }
}
