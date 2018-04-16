using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Infrastructure.Core
{
    /// <summary>
    /// 消息传递异常
    /// </summary>
    public class MessageException : Exception
    {
        public MessageException()
        {
        }

        public MessageException(string message) : base(message)
        {
        }

        public MessageException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected MessageException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
