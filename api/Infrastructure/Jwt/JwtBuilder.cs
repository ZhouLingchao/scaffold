using AutoMapper;
using Infrastructure.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class JwtBuilder
    {
        public static void AddJwt(this IServiceCollection services, IConfigurationSection jwtConfiguration)
        {
            services.Configure<JwtSetupOption>(jwtConfiguration);

            var option = jwtConfiguration.Get<JwtSetupOption>();
            //注册Jwt服务
            services.AddScoped<IJwtService, JwtService>();
            //配置jwt验证

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(option.SigningKey));

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,
                // Validate the JWT Issuer (iss) claim
                ValidateIssuer = true,
                ValidIssuer = option.Issuer,

                // Validate the JWT Audience (aud) claim
                ValidateAudience = true,
                ValidAudience = option.Audience,

                // Validate the token expiry
                ValidateLifetime = true,

                // If you want to allow a certain amount of clock drift, set that here:
                ClockSkew = TimeSpan.Zero
            };

            services
                .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = tokenValidationParameters;
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                });
        }
    }
}
