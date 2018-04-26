using Infrastructrue.Constants.Enums;
using Infrastructure.Core;
using Infrastructure.Mvc;
using Infrastrucure.Mvc;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;

namespace Infrastrucure.Mvc
{
    // 异常处理中间件
    public class ExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                var message = string.Empty;
                if (ex is NoAuthenticationException)
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync(message);
                }
                else if (ex is NoAuthorizationException)
                {
                    context.Response.StatusCode = StatusCodes.Status405MethodNotAllowed;
                    await context.Response.WriteAsync(message);
                }
                else
                {
                    if (ex is MessageException)
                    {
                        message = ex.Message;
                    }
                    else
                    {
                        var errorService = context.RequestServices.GetService(typeof(IErrorService)) as IErrorService;
                        message = errorService?.Invoke(ex) ?? "系统异常";
                    }
                    //消息传递,使用200HTTPCODE
                    context.Response.StatusCode = StatusCodes.Status200OK;
                    context.Response.Headers.Add("Content-Type", "application/json");
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(new ResponseJsonModel
                    {
                        Code = (int)EResponseCode.Error,
                        Message = message
                    }));
                }
            }
        }
    }
}
namespace Microsoft.AspNetCore.Builder
{ 
    public static class ExceptionHandlerBuilder
    {
        public static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionHandlerMiddleware>();
        }
    }
}