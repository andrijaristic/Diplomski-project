namespace Contracts.UserDTOs
{
    public class AuthDTO
    {
        public string Token { get; set; }
        public string VerificationStatus { get; set; }
        public bool IsVerified { get; set; }
    }
}
