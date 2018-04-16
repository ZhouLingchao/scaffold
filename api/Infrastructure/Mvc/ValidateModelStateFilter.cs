using Infrastructure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastrucure.Mvc
{
    /// <summary>
    /// 用于检测action输入model参数是否满足要求
    /// 不再需要每个action调用如下方法：
    /// if(Model.IsValid){
    ///     //TODO your code
    /// }
    /// 报错直接抛出MessageException异常
    /// </summary>
    public class ValidateModelStateFilter : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            if (!context.ModelState.IsValid)
            {
                BuildErrorMessage(context);
            }

            await next.Invoke();
        }

        private static void BuildErrorMessage(ActionExecutingContext context)
        {
            var errorMessages = new List<String>();
            foreach (var entry in context.ModelState)
            {
                if (entry.Value.ValidationState == ModelValidationState.Invalid)
                {
                    foreach (var error in entry.Value.Errors)
                    {
                        errorMessages.Add(error.ErrorMessage);
                    }
                }
            }

            throw new MessageException(String.Join(",", errorMessages));
        }
    }
}
