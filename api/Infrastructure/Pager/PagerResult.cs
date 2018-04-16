using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Infrastructure.Pager
{
    public class PagerResult<T>
    {
        public int PageCount { get; set; }
        public int RecordCount { get; set; }
        public List<T> Data { get; set; }
    }
}
