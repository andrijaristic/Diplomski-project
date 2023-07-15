using Contracts.UserDTOs;
using Domain.Enums;
using Domain.Interfaces.Utilities;
using Domain.Models;
using Domain.Models.AppSettings;
using Google.Apis.Auth;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Runtime;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Service.Utilities
{
    public class AuthUtility : IAuthUtility
    {
        public string CreateToken(Guid id, string username, UserType userRole, string key, string issuer, int duration)
        {
            List<Claim> claims = new List<Claim>();

            claims.Add(new Claim(ClaimTypes.Role, userRole.ToString().ToLower()));
            claims.Add(new Claim(ClaimTypes.Name, username));
            claims.Add(new Claim("id", id.ToString()));

            var signInCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)), SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                              issuer: issuer,
                              claims: claims,
                              expires: DateTime.Now.AddMinutes(duration),
                              signingCredentials: signInCredentials
                        );
            
            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        public async Task<SocialMediaDTO> VerifyGoogleToken(ExternalLoginDTO externalLoginDTO, string clientId)
        {
            try
            {
                var validationSettings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    Audience = new List<string>() { clientId }
                };

                var userInfo = await GoogleJsonWebSignature.ValidateAsync(externalLoginDTO.Token, validationSettings);
                SocialMediaDTO socialMediaDTO = new SocialMediaDTO()
                {
                    Username = userInfo.Email.Split("@")[0],
                    FirstName = userInfo.Name.Replace(userInfo.FamilyName, "").Trim(),
                    LastName = userInfo.FamilyName,
                    Email = userInfo.Email
                };


                return socialMediaDTO;
            } catch
            {
                return null;
            }
        }
    }
}
