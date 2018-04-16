using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Infrastrucure.Mvc
{
    // 未登录异常
    public class NoAuthenticationException : Exception
    {
        public NoAuthenticationException()
        {
        }

        public NoAuthenticationException(string message) : base(message)
        {
        }

        public NoAuthenticationException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected NoAuthenticationException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
