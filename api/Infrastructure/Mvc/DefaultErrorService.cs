using Microsoft.Extensions.Logging;
using System;

namespace Infrastrucure.Mvc
{
    /// <summary>
    /// 默认错误处理机制
    /// 返回系统异常字样，并用ILogger记录日志
    /// </summary>
    public class DefaultErrorService : IErrorService
    {
        private readonly ILogger _logger;

        public DefaultErrorService(ILogger<DefaultErrorService> logger)
        {
            _logger = logger;
        }

        public string Invoke(Exception ex)
        {
            var innerEx = GetInnerException(ex);
            //如果是异常信息，则记录错误信息
            _logger.LogError(ex, innerEx.Message);
            _logger.LogError(ex, innerEx.StackTrace);
            return "系统异常";
        }

        private Exception GetInnerException(Exception ex)
        {
            while (null != ex.InnerException)
            {
                ex = ex.InnerException;
            }
            return ex;
        }
    }
}
