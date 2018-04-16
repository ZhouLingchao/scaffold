using Api.AppSettings;
using Api.Models.User;
using Db;
using Db.Entities.Users;
using Infrastructure.Constants.Enums;
using Infrastructure.Core;
using Infrastructure.Infrastructure;
using Infrastructure.Jwt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Api.Controllers.Users
{
    /// <summary>
    /// 管理token控制器，即常规登陆注销接口
    /// </summary>
    [Route("api/[controller]")]
    public class TokensController : Controller
    {
        private readonly ApiDbContext _db;
        private readonly ICipherService _cipher;
        private readonly IJwtService _jwt;

        public TokensController(ApiDbContext db, ICipherService cipher, IJwtService jwt)
        {
            _db = db;
            _cipher = cipher;
            _jwt = jwt;
        }

        /// <summary>
        /// 登录接口
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]LoginViewModel model)
        {
            var user = await _db.User.FirstOrDefaultAsync(x => x.Code == model.Account);
            if (null == user) throw new MessageException("账号不存在");
            if ((int)user.AccountStatus >= (int)EAccountStatus.Fozen) throw new MessageException("账号状态异常，无法使用");
            if (user.Password != _cipher.Encrypt(model.Password, user.SecuritySeed)) throw new MessageException("账号密码错误");
            return CreateJwtToken(user).ToFormatJson();
        }

        private string CreateJwtToken(User user)
        {
            var customPayload = new List<Claim>()
            {
                new Claim(ClaimTypes.Name ,user.RealName )
            };
            return _jwt.Create(customPayload);
        }
    }
}
