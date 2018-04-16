using Infrastrucure.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastrucure.Mvc
{
    /// <summary>
    /// 专门用于处理错误
    /// </summary>
    public interface IErrorService
    {
        string Invoke(Exception ex);
    }
}

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ErrorServiceExtenstion
    {
        /// <summary>
        /// 使用默认的错误处理机制
        /// 区别于异常中间件,异常中间件用于捕获所有系统异常
        /// 而错误处理服务，只用于处理系统未预测到的异常，并提供处理方式
        /// </summary>
        /// <param name="services"></param>
        public static void AddErrorHandler(this IServiceCollection services)
        {
            services.AddScoped<IErrorService, DefaultErrorService>();
        }

        /// <summary>
        /// 使用自定义的错误处理服务
        /// 区别于异常中间件,异常中间件用于捕获所有系统异常
        /// 而错误处理服务，只用于处理系统未预测到的异常，并提供处理方式
        /// </summary>
        /// <typeparam name="T">自定义的错误处理服务</typeparam>
        /// <param name="services"></param>
        public static void AddErrorHandler<T>(this IServiceCollection services) where T: class,IErrorService 
        {
            services.AddScoped<IErrorService, T>();
        }
    }
}
