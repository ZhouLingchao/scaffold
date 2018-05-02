using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Tarmac
{
    /// <summary>
    /// 停机坪数据上传的model
    /// </summary>
    public class UploadDataViewModel
    {
        /// <summary>
        /// 采集时间
        /// </summary>
        [Required]
        public DateTime GatherTime { get; set; }

        /// <summary>
        /// 采集数据
        /// </summary>
        [Required]
        public string Value { get; set; }
    }
}
