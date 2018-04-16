using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Db.Entities
{
    /// <summary>
    /// 提供给所有数据库对应实体类继承，提供统一的主键，以及方便的替换
    /// </summary>
    public class PrimaryKey
    {
        /// <summary>
        ///  默认使用自增，若要自定义，重写id即可
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public virtual long Id { get; set; }
    }
}
