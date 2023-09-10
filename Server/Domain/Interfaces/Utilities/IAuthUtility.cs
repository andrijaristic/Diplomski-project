using Contracts.UserDTOs;
using Domain.Enums;

namespace Domain.Interfaces.Utilities
{
    public interface IAuthUtility
    {
        string CreateToken(Guid id, string username, string firstName, string lastName, UserType userRole, string key, string issuer, int duration);
        Task<SocialMediaDTO> VerifyGoogleToken(ExternalLoginDTO externalLoginDTO, string clientId);
    }
}
