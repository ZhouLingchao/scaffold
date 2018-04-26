using System;
using System.IO;
using System.Text;
using Api.AppSettings;
using Db;
using Infrastructure.Infrastructure;
using Infrastructure.Jwt;
using Infrastrucure.Mvc;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;

namespace Api
{
    /// <summary>
    /// 默认启动配置文件
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="env"></param>
        /// <param name="configuration"></param>
        public Startup(IHostingEnvironment env, IConfiguration configuration)
        {
            Configuration = configuration;
            HostingEnvironment = env;
        }

        /// <summary>
        /// 配置信息，读取appsettings.json文件
        /// </summary>
        public IConfiguration Configuration { get; }
        /// <summary>
        /// 环境变量，读取服务器ASPNETCORE_ENVIRONMENT环境变量
        /// </summary>
        public IHostingEnvironment HostingEnvironment { get; }
        /// <summary>
        /// 配置服务，常用于配置依赖注入
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureServices(IServiceCollection services)
        {
            var appOption = Configuration.GetSection(nameof(AppOption));
            services.AddDbContext<ApiDbContext>(options => options.UseSqlServer(appOption.GetValue<string>(nameof(AppOption.Configuration))))
                    .Configure<AppOption>(appOption);

            // 分布式缓存服务
            ConfigureCache(services);

            //加载AutoMapper OO控件
            services.InitializeAutoMapper(GetType().Assembly);

            //加入通用的分页服务
            services.AddPager(option =>
            {
                option.StartPageIndex = 1;
                option.DefaultPageSize = 10;
            });

            //使用jwt认证方式
            var jwtOption = Configuration.GetSection(nameof(JwtSetupOption));
            services.AddJwt(jwtOption);
            //加密服务
            services.AddScoped<ICipherService, AesCipherService>();

            // 配置api文档服务
            ConfigureSwagger(services);

            //错误处理方式
            services.AddErrorHandler();

            services.AddMvc(setup =>
            {
                setup.Filters.Add<ValidateModelStateFilter>();
            });
        }

        /// <summary>
        /// 配置方法，常用于配置中间件
        /// </summary>
        /// <param name="app"></param>
        /// <param name="logger"></param>
        public void Configure(IApplicationBuilder app, ILoggerFactory logger)
        {
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials());
            app.UseCustomExceptionHandler();
            if (HostingEnvironment.IsDevelopment())
            {
                logger.AddConsole();
            }
            app.UseAuthentication();
            app.UseMvc();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint(Configuration.GetSection(nameof(AppOption)).GetValue<string>(nameof(AppOption.SwaggerJsonUrl)), "API V1");
            });
        }

        /// <summary>
        /// 开发环境不使用缓存
        /// </summary>
        /// <param name="services"></param>
        private void ConfigureCache(IServiceCollection services)
        {
            if (HostingEnvironment.IsDevelopment())
            {
                services.AddScoped<IDistributedCache, NullDistributedCache>();
            }
            else
            {
                var redisOption = Configuration.GetSection(nameof(RedisOption)).Get<RedisOption>();
                services.AddDistributedRedisCache(options =>
                {
                    options.Configuration = redisOption.Configuration;
                    options.InstanceName = redisOption.InstanceName;
                });
            }
        }

        private void ConfigureSwagger(IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "API", Version = "v1" });
                var filePath = Path.Combine(Environment.CurrentDirectory, "api.xml");
                c.IncludeXmlComments(filePath);
            });
        }
    }
}
