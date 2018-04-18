using Api.Models.User;
using Db;
using Db.Entities.Users;
using Infrastructure.Core;
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
    /// 角色资源接口
    /// </summary>
    [Route("api/[controller]")]
    [Authorize]
    public class RolesController : Controller
    {
        private readonly ApiDbContext _db;
        private readonly IPagerService _pager;
        public RolesController(ApiDbContext db, IPagerService pager)
        {
            _db = db;
            _pager = pager;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery]RolesViewModel model)
        {
            var body = _db.Role.AsQueryable().AsNoTracking().Select(x => new
            {
                x.Id,
                x.Name,
            });
            var data = await _pager.GetPagedListAsync(body.OrderBy(x => x.Id), model);
            return data.ToFormatJson();

        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RoleCreateViewModel model)
        {
            var entity = new Role
            {
                Name = model.Name
            };
            using (var trans = _db.Database.BeginTransaction())
            {
                _db.Add(entity);
                await _db.SaveChangesAsync();
                List<RoleFunctions> roleFunctions = BuildRoleFunctions(model, entity);
                entity.RoleFunctions = roleFunctions;
                await _db.SaveChangesAsync();
                trans.Commit();
            }
            return entity.ToFormatJson();
        }

        private static List<RoleFunctions> BuildRoleFunctions(RoleCreateViewModel model, Role entity)
        {
            var roleFunctions = new List<RoleFunctions>();
            if (model.Functions != null && model.Functions.Length > 0)
            {
                model.Functions.ToList().ForEach(x => roleFunctions.Add(new RoleFunctions
                {
                    Role = entity,
                    FunctionCode = x
                }));
            }
            return roleFunctions;
        }

        [HttpPut]
        public async Task Put([FromBody]RoleUpdateViewModel model)
        {
            var entity = await _db.Role.FirstOrDefaultAsync(x => x.Id == model.Id);
            if (null == entity) throw new MessageException("角色不存在");
            entity.Name = model.Name;
            entity.RoleFunctions = BuildRoleFunctions(model, entity);
            await _db.SaveChangesAsync();
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task Delete(long id)
        {
            _db.Role.Remove(new Role { Id = id });
            await _db.SaveChangesAsync();
        }
    }
}
