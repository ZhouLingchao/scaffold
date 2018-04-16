using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastrucure.Mvc
{
    // 未授权异常
    public class NoAuthorizationException : Exception
    {
        public NoAuthorizationException() { }
        public NoAuthorizationException(string message) : base(message) { }
        public NoAuthorizationException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
