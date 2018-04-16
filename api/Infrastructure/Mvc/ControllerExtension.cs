using Infrastructure.Constants.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.AspNetCore.Mvc
{
    public static class ControllerExtension
    {
        public static JsonResult ToFormatJson(this Object result)
        {
            return new JsonResult(new
            {
                Data = result
            });
        }
    }
}
