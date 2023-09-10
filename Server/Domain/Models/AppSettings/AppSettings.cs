namespace Domain.Models.AppSettings
{
    public class AppSettings
    {
        public string SecretKey { get; set; }
        public string StripeSecretKey { get; set; }
        public string StripePublishableKey { get; set; }
        public string GoogleClientId { get; set; }
        public string DefaultPassword { get; set; }
        public string DefaultPhoneNumber { get; set; }
        public string DefaultCountry { get; set; }
        public string DefaultImagePath { get; set; }
        public string AdminFirstName { get; set; }
        public string AdminLastName { get; set; }
        public string AdminEmail { get; set; }
        public string EmailRegex { get; set; }
        public string PhoneNumberRegex { get; set; }
        public int MinUsernameLength { get; set; }
        public int MinPasswordLength { get; set; }
        public int AccommodationsPageSize { get; set; }
        public string TokenIssuer { get; set; }
        public int TokenDuration { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public int Port { get; set; }
    }
}
