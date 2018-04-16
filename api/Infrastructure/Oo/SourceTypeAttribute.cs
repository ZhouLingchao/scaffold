using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Oo
{
    /// <summary>
    /// 标记后类会被<see cref="MapperInitialization"/>检测到，在初始化用于AutoMapper自动注册
    /// Type属性表示标记类的来源类型
    /// </summary>
    [AttributeUsage(AttributeTargets.Class)]
    public class SourceTypeAttribute:Attribute
    {
        public Type Type { get; set; }
        private SourceTypeAttribute() { }
        public SourceTypeAttribute(Type type)
        {
            Type = type;
        }
    }
}
