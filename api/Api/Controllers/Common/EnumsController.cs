using Infrastructrue.Constants;
using Infrastructrue.Constants.Enums;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Api.Controllers.Common
{
    /// <summary>
    /// 通用获取后台枚举接口,保证前后台枚举数据同步
    /// </summary>
    [Route("api/[controller]")]
    public class EnumsController : Controller
    {
        private readonly IDistributedCache _cache;
        public EnumsController(IDistributedCache cache)
        {
            _cache = cache;
        }
        [HttpGet]
        public async Task<IActionResult> Get([Required]string name)
        {
            var cacheKey = CacheKey.ENUMS_PREFIX + name;
            var cacheValue = await _cache.GetStringAsync(cacheKey);
            if (string.IsNullOrWhiteSpace(cacheValue)) // 重新获取
            {
                cacheValue = GetEnumFormatValue(name);
                _cache.SetStringAsync(cacheKey, cacheValue, new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(20)
                });
            }
            return cacheValue.ToFormatJson();
        }

        private string GetEnumFormatValue(string name)
        {
            var archor = new EnumLocationAnchor().GetType();
            var assembly = Assembly.Load(archor.Assembly.GetName().Name);
            var type = assembly.GetType($"{archor.Namespace}.{name}", false, true);

            var list = new List<dynamic>();
            foreach (var e in Enum.GetValues(type))
            {
                //获取特定的特性值
                var model = new
                {
                    Value = Convert.ToInt32(e),
                    Text = Enum.GetName(type, e)
                };
                list.Add(model);
            }
            return JsonConvert.SerializeObject(list);
        }
    }
}
