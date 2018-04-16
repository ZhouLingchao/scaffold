using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Oo
{
    /// <summary>
    /// 标记后类会被<see cref="MapperInitialization"/>检测到，在初始化用于AutoMapper自动注册
    /// Type属性表示标记类的目标类型
    /// </summary>
    [AttributeUsage(AttributeTargets.Class)]
    public class DestinationTypeAttribute:Attribute
    {

        public Type Type { get; set; }
        private DestinationTypeAttribute() { }
        public DestinationTypeAttribute(Type type)
        {
            Type = type;
        }
    }
}
