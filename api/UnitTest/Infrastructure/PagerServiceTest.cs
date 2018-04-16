using Infrastructure.Pager;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace UnitTest.Infrastructure
{
    public class PagerServiceTest
    {
        private readonly List<Demo> _list;

        public PagerServiceTest()
        {
            _list = new List<Demo>();
            for (int i = 0; i < 100; i++)
            {
                _list.Add(new Demo { Seq = i });
            }
        }

        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        public void GetDefaultPagedList(int pageIndex)
        {
            var option = Options.Create(new PagerSetupOption
            {
                StartPageIndex = pageIndex,
                DefaultPageSize = 10
            });

            var pager = new PagerService(option);
            var orderedData = _list.AsQueryable().OrderBy(x => x.Seq);
            var rs = pager.GetPagedList(orderedData);

            Assert.Equal(100, rs.RecordCount);
            Assert.Equal(10, rs.PageCount);
            Assert.Equal(orderedData.First().Seq, rs.Data.First().Seq);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        public void GetDefaultPagedList_SecondPage(int pageIndex)
        {
            var option = Options.Create(new PagerSetupOption
            {
                StartPageIndex = pageIndex,
                DefaultPageSize = 10
            });

            var pager = new PagerService(option);
            var orderedData = _list.AsQueryable().OrderBy(x => x.Seq);
            var rs = pager.GetPagedList(orderedData,new PagerParams {
                PageIndex = pageIndex+1,
                PageSize = 10
             });

            Assert.Equal(100, rs.RecordCount);
            Assert.Equal(10, rs.PageCount);
            Assert.Equal(10, rs.Data.First().Seq);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        public void GetDefaultPagedList_OutRange(int pageIndex)
        {
            var option = Options.Create(new PagerSetupOption
            {
                StartPageIndex = pageIndex,
                DefaultPageSize = 10
            });

            var pager = new PagerService(option);
            var orderedData = _list.AsQueryable().OrderBy(x => x.Seq);
            var rs = pager.GetPagedList(orderedData, new PagerParams
            {
                PageIndex = pageIndex + 12,
                PageSize = 10
            });

            Assert.Equal(100, rs.RecordCount);
            Assert.Equal(10, rs.PageCount);
            Assert.Empty(rs.Data);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        public void GetDefaultPagedList_NoCount(int pageIndex)
        {
            var option = Options.Create(new PagerSetupOption
            {
                StartPageIndex = pageIndex,
                DefaultPageSize = 10
            });

            var pager = new PagerService(option);
            var orderedData = _list.AsQueryable().OrderBy(x => x.Seq);
            var rs = pager.GetPagedList(orderedData, false);

            Assert.Equal(-1, rs.RecordCount);
            Assert.Equal(-1, rs.PageCount);
            Assert.Equal(orderedData.First().Seq, rs.Data.First().Seq);
        }
    }

    class Demo
    {
        public int Seq { get; set; }
    }
}
