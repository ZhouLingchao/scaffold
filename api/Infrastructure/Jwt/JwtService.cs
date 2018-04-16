using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Linq;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Threading.Tasks;

namespace Infrastructure.Jwt
{
    public class JwtService : IJwtService
    {
        private readonly JwtSetupOption _option;
        public JwtService(IOptions<JwtSetupOption> option)
        {
            _option = option.Value;
        }
        public string Create( List<Claim> customPayload)
        {
            var now = DateTime.UtcNow;

            var claims = new List<Claim>()
            {
               new Claim( JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()) ,
               new Claim( JwtRegisteredClaimNames.Iss ,_option.Issuer),
               new Claim( JwtRegisteredClaimNames.Iat, now.ToUniversalTime().ToString(),ClaimValueTypes.Integer64) ,
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_option.SigningKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                audience: _option.Audience,
                claims: claims,
                notBefore: now,
                expires: now.AddMinutes(_option.ExpireMinuites),
                signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
            
        }

        public async Task ValidateAsync(TokenValidatedContext context)
        {
            return;
        }
    }
}
