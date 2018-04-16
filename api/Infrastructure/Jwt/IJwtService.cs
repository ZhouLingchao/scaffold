using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Infrastructure.Jwt
{
    public interface IJwtService
    {
        string Create(List<Claim> customPayload);
        Task ValidateAsync(TokenValidatedContext context);
    }
}



