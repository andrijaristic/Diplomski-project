namespace Contracts.UserDTOs
{
    public class ExternalLoginDTO
    {
        public string Token { get; set; }
        public string Service { get; set; }
        public string Role { get; set; }
    }
}
