using Domain.Interfaces.Repositories;
using Domain.Interfaces.Utilities.DataInitializers;
using Domain.Models;
using Domain.Models.AppSettings;
using Microsoft.Extensions.Options;

namespace Service.Utilities.DataInitializers
{
    public class UserDataInitializer : IUserDataInitializer
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IOptions<AppSettings> _settings;

        public UserDataInitializer(IUnitOfWork unitOfWork, IOptions<AppSettings> settings)
        {
            _unitOfWork = unitOfWork;
            _settings = settings;
        }

        public void InitializeData()
        {
            string defaultUsername = $"{_settings.Value.AdminFirstName.ToLower()}.{_settings.Value.AdminLastName.ToLower()}";
            Task<User> task = _unitOfWork.Users.FindByUsername(defaultUsername);
            task.Wait();

            if (task.Result != null)
            {
                return;
            }

            User newUser = new User()
            {
                FirstName = _settings.Value.AdminFirstName,
                LastName = _settings.Value.AdminLastName,
                Username = defaultUsername,
                Email = _settings.Value.AdminEmail,
                Role = Domain.Enums.UserType.ADMIN,
                Country = _settings.Value.DefaultCountry,
                PhoneNumber = _settings.Value.DefaultPhoneNumber,
                IsVerified = true,
                VerificationStatus = Domain.Enums.VerificationStatus.ACCEPTED,
                Password = BCrypt.Net.BCrypt.HashPassword(_settings.Value.AdminFirstName.ToLower(), BCrypt.Net.BCrypt.GenerateSalt())
            };

            _unitOfWork.Users.Add(newUser).Wait();
            _unitOfWork.Save().Wait();
        }
    }
}
