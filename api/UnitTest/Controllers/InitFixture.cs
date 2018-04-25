using Api;
using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace UnitTest.Controllers
{
    class InitFixture:IDisposable
    {
        public InitFixture()
        {
            MapperInitialization.Initialize(Assembly.GetAssembly(typeof(Startup)));
        }
        public void Dispose()
        {
            Mapper.Reset();
        }
    }
}
