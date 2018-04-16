using Infrastructure.Mvc;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Mvc
{
    public class ResponseProcessMiddleware
    {
        private readonly RequestDelegate _next;

        public ResponseProcessMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            await _next(context);

            if (context.Response.StatusCode == StatusCodes.Status204NoContent)
            {
                context.Response.Headers.Add("Content-Type", "application/json");
                await context.Response.WriteAsync(JsonConvert.SerializeObject(new ResponseJsonModel()));
            }
        }
    }
}

namespace Microsoft.AspNetCore.Builder
{
    public static class ResponseProcessBuilder
    {
        public static IApplicationBuilder UserResponseProcess(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ResponseProcessMiddleware>();
        }
    }
}
