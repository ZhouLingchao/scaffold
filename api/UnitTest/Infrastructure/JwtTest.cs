using Infrastructure.Jwt;
using Jose;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using Xunit;

namespace UnitTest.Infrastructure
{
    public class JwtTest
    {

        [Fact]
        public void CreateTokenTest()
        {
            var key = Guid.NewGuid().ToString();
            var service = new JwtService(Options.Create(new JwtSetupOption
            {
                Audience = "test",
                Issuer = "test",
                ExpireMinuites = 20,
                SigningKey = key
            }));

            var token = service.Create( new List<Claim>()
            {
                new Claim( "name","admin")
            });
        }
    }
}
