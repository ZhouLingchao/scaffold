using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Pager
{
    /// <summary>
    /// 分页服务
    /// </summary>
    public class PagerService : IPagerService
    {
        private readonly PagerSetupOption _option;
        public PagerService(IOptions<PagerSetupOption> option)
        {
            _option = option.Value;
        }

        public  PagerResult<T> GetPagedList<T>(IQueryable<T> orderedData, bool hasCount = true) where T : class
        {
            var pagerParams = new PagerParams
            {
                PageIndex = _option.StartPageIndex,
                PageSize = _option.DefaultPageSize
            };
            return GetPagedList(orderedData, pagerParams, hasCount);
        }

        public PagerResult<T> GetPagedList<T>(IQueryable<T> orderedData, PagerParams @params, bool hasCount = true) where T : class
        {
            var pageIndex = @params.PageIndex??_option.StartPageIndex;
            var pageSize = @params.PageSize??_option.DefaultPageSize;
            int recordCount = -1, pageCount = -1;

            //进行汇总
            if (hasCount && pageSize > 0)
            {
                recordCount = orderedData.Count();
                pageCount = recordCount / pageSize;
                if ((recordCount % pageSize) != 0) pageCount++;
            }

            //获取分页数据
            List<T> list = new List<T>();
            var skipCount = pageSize * (pageIndex - _option.StartPageIndex);
            //如果总数小于等于需要跳过的行数，则不进行分页查询，节省资源
            //主要针对总行数为0的情况
            //e.g.
            //  recordCount = 10 
            //  pageSize = 10 , pageIndex = 3
            // 此时没必要查询
            if (-1 == recordCount || recordCount > skipCount)
            {
                orderedData = orderedData.Skip(skipCount).Take(pageSize);
                list =  orderedData.ToList();
            }

            return new PagerResult<T>
            {
                Data = list,
                PageCount = pageCount,
                RecordCount = recordCount
            };
        }

        public async Task<PagerResult<T>> GetPagedListAsync<T>(IQueryable<T> orderedData, bool hasCount = true) where T : class
        {
            var pagerParams = new PagerParams
            {
                PageIndex = _option.StartPageIndex,
                PageSize = _option.DefaultPageSize
            };
            return await GetPagedListAsync(orderedData, pagerParams, hasCount);
        }

        public async Task<PagerResult<T>> GetPagedListAsync<T>(IQueryable<T> orderedData, PagerParams @params, bool hasCount = true) where T : class
        {
            var pageIndex = @params.PageIndex ?? _option.StartPageIndex;
            var pageSize = @params.PageSize ?? _option.DefaultPageSize;
            int recordCount = -1, pageCount = -1;

            //进行汇总
            if (hasCount && pageSize > 0)
            {
                recordCount = await orderedData.CountAsync();
                pageCount = recordCount / pageSize;
                if ((recordCount % pageSize) != 0) pageCount++;
            }

            //获取分页数据
            List<T> list = new List<T>();
            var skipCount = pageSize * (pageIndex - _option.StartPageIndex);
           
            if (-1 == recordCount || recordCount > skipCount)
            {
                orderedData = orderedData.Skip(skipCount).Take(pageSize);
                list = await orderedData.ToListAsync();
            }

            return new PagerResult<T>
            {
                Data = list,
                PageCount = pageCount,
                RecordCount = recordCount
            };
        }
    }
}
