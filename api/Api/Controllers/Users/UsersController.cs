using Api.Models.User;
using AutoMapper;
using Db;
using Db.Entities.Users;
using Infrastructure.Constants.Enums;
using Infrastructure.Core;
using Infrastructure.Infrastructure;
using Infrastructure.Pager;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers.Users
{
    /// <summary>
    /// 用户资源接口
    /// </summary>
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly ApiDbContext _db;
        private readonly IPagerService _pager;
        private readonly ICipherService _cipher;

        public UsersController(ApiDbContext db, IPagerService pager, ICipherService cipher)
        {
            _db = db;
            _pager = pager;
            _cipher = cipher;
        }

        /// <summary>
        ///  获取用户列表
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]UsersViewModel model)
        {
            var body = from user in _db.User.Where(x => x.AccountStatus < EAccountStatus.删除)
                       select new
                       {
                           user.Id,
                           user.RealName,
                           user.Mobile,
                           user.EMail,
                           user.Birthday,
                           user.AccountStatus,
                           user.Gender
                       };
            var data = await _pager.GetPagedListAsync( body.OrderBy(x => x.Id),model);
            return Json(data);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]UserCreateViewModel model)
        {
            if (await _db.User.AnyAsync(x => x.Mobile == model.Mobile )) throw new MessageException("账号已经存在");
            var securitySeed = Guid.NewGuid().ToString();
            var entity = Mapper.Map<UserCreateViewModel, User>(model);
            entity.SecuritySeed = securitySeed;
            entity.Password = _cipher.Encrypt(model.Password, securitySeed);
            entity.UserRoleRel = new List<UserRoleRel>() { new UserRoleRel{
                Role = _db.Role.First(x=>x.Id == model.RoleId),
                User = entity,
            } };
            _db.Add(entity);
            await _db.SaveChangesAsync();
            return Json(entity);
        }

        [HttpPut]
        public async Task Put([FromBody]UserUpdateViewModel model)
        {
            var entity = await _db.User.FirstOrDefaultAsync(x => x.Id == model.Id);
            if (null == entity) throw new MessageException("账号不存在");
            Mapper.Map(model, entity);
            entity.Password = _cipher.Encrypt(model.Password, entity.SecuritySeed);
            await _db.SaveChangesAsync();
        }
        
        /// <summary>
        /// 删除用户，逻辑删除
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("{id}")]
        public async Task Delete(long Id)
        {
            var entity = await _db.User.FirstOrDefaultAsync(x => x.Id == Id);
            if (null == entity) throw new MessageException("账号不存在");
            entity.AccountStatus = EAccountStatus.删除;
            await _db.SaveChangesAsync();
        }
    }
}
