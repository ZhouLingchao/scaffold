using Infrastructure.Pager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Pager
{
    /// <summary>
    /// 分页服务接口
    /// </summary>
    public interface IPagerService
    {
        /// <summary>
        /// data必须为已经排序的iqueryable
        /// 分页参数以预设参数确定
        /// 默认输出查询总行数总页数
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="orderedData"></param>
        /// <param name="hasCount">是否输出查询总行数总页数</param>
        /// <returns></returns>
        PagerResult<T> GetPagedList<T>(IQueryable<T> orderedData, bool hasCount = true) where T : class;

        /// <summary>
        /// data必须为已经排序的iqueryable
        /// 默认输出查询总行数总页数
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="orderedData"></param>
        /// <param name="params">分页参数</param>
        /// <param name="hasCount">是否输出查询总行数总页数</param>
        /// <returns></returns>
        PagerResult<T> GetPagedList<T>(IQueryable<T> orderedData, PagerParams @params,bool hasCount = true) where T : class;

        /// <summary>
        /// data必须为已经排序的iqueryable
        /// 分页参数以预设参数确定
        /// 默认输出查询总行数总页数
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="orderedData"></param>
        /// <param name="hasCount">是否输出查询总行数总页数</param>
        /// <returns></returns>
        Task<PagerResult<T>> GetPagedListAsync<T>(IQueryable<T> orderedData, bool hasCount = true) where T : class;

        /// <summary>
        /// data必须为已经排序的iqueryable
        /// 默认输出查询总行数总页数
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="orderedData"></param>
        /// <param name="params">分页参数</param>
        /// <param name="hasCount">是否输出查询总行数总页数</param>
        /// <returns></returns>
        Task<PagerResult<T>> GetPagedListAsync<T>(IQueryable<T> orderedData, PagerParams @params, bool hasCount = true) where T : class;
    }
}

namespace Microsoft.Extensions.DependencyInjection
{
    public static class PagerServiceExtenstion
    {
        public static void AddPager(this IServiceCollection services,Action<PagerSetupOption> setup)
        {
            services.Configure(setup);

            services.AddScoped<IPagerService, PagerService>();
        }
    }
}
