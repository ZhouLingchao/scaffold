using Infrastructrue.Constants.Enums;
using Infrastructure.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace Microsoft.AspNetCore.Mvc
{
    public static class ControllerExtension
    {
        public static JsonResult ToFormatJson(this Object result)
        {
            return new JsonResult(new ResponseJsonModel
            {
                Code = (int)EResponseCode.Success,
                Data = result
            });
        }
    }
}
