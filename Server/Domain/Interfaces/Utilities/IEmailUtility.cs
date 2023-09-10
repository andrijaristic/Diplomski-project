namespace Domain.Interfaces.Utilities
{
    public interface IEmailUtility
    {
        Task SendEmail(string email, string name, bool isAccepted);
    }
}
