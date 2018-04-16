using AutoMapper;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using System.Linq;
using Microsoft.Extensions.DependencyInjection;
using Infrastructure.Oo;

namespace Microsoft.Extensions.DependencyInjection
{
    /// <summary>
    /// AutoMapper初始化帮助类
    /// </summary>
    public static class MapperInitialization
    {
        /// <summary>
        /// ASP.NETCORE 用于configureServices的拓展方法
        /// </summary>
        /// <param name="services"></param>
        /// <param name="assemblies"></param>
        public static void InitializeAutoMapper(this IServiceCollection services, params Assembly[] assemblies)
        {
            Initialize(assemblies);
        }

        /// <summary>
        /// 初始化AutoMapper
        /// </summary>
        /// <param name="assemblies">参数不允许包含null,否则抛出空指针异常</param>
        public static void Initialize(params Assembly[] assemblies)
        {
            if (null == assemblies) throw new ArgumentNullException(nameof(assemblies));

            Mapper.Initialize(config => Initialize(config, assemblies));
        }

        private static void Initialize( IMapperConfigurationExpression config,params Assembly[] assemblies)
        {
            foreach (var assembly in assemblies)
            {
                var types = assembly.GetTypes();

                foreach (var type in types)
                {
                    var destinationType = type.GetCustomAttribute<DestinationTypeAttribute>();
                    if (destinationType != null)
                    {
                        config.CreateMap(type, destinationType.Type);
                    }

                    var sourceType = type.GetCustomAttribute<SourceTypeAttribute>();
                    if (sourceType != null)
                    {
                        config.CreateMap(sourceType.Type, type);
                    }
                }
            }
           
        }
    }
}
