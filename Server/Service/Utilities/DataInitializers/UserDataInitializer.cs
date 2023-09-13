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
            //string defaultUsername = _settings.Value.AdminFirstName.ToLower();
            Task<User> task = _unitOfWork.Users.FindByUsername(defaultUsername);
            task.Wait();

            
            if (task.Result != null)
            {
                return;
            }

            User admin = new User()
            {
                FirstName = _settings.Value.AdminFirstName,
                LastName = _settings.Value.AdminLastName,
                Username = _settings.Value.AdminFirstName.ToLower(),
                Email = _settings.Value.AdminEmail,
                Role = Domain.Enums.UserType.ADMIN,
                Country = _settings.Value.DefaultCountry,
                PhoneNumber = _settings.Value.DefaultPhoneNumber,
                IsVerified = true,
                VerificationStatus = Domain.Enums.VerificationStatus.ACCEPTED,
                Password = BCrypt.Net.BCrypt.HashPassword(_settings.Value.AdminFirstName.ToLower(), BCrypt.Net.BCrypt.GenerateSalt())
            };

            User owner = new User()
            {
                FirstName = _settings.Value.OwnerFirstName,
                LastName = _settings.Value.OwnerLastName,
                Username = _settings.Value.OwnerFirstName.ToLower(),
                Email = _settings.Value.OwnerEmail,
                Role = Domain.Enums.UserType.OWNER,
                Country = _settings.Value.DefaultCountry,
                PhoneNumber = _settings.Value.DefaultPhoneNumber,
                IsVerified = true,
                VerificationStatus = Domain.Enums.VerificationStatus.ACCEPTED,
                Password = BCrypt.Net.BCrypt.HashPassword(_settings.Value.OwnerFirstName.ToLower(), BCrypt.Net.BCrypt.GenerateSalt())
            };

            User rentee = new User()
            {
                FirstName = _settings.Value.RenteeFirstName,
                LastName = _settings.Value.RenteeLastName,
                Username = _settings.Value.RenteeFirstName,
                Email = _settings.Value.RenteeEmail,
                Role = Domain.Enums.UserType.RENTEE,
                Country = _settings.Value.DefaultCountry,
                PhoneNumber = _settings.Value.DefaultPhoneNumber,
                IsVerified = true,
                VerificationStatus = Domain.Enums.VerificationStatus.ACCEPTED,
                Password = BCrypt.Net.BCrypt.HashPassword(_settings.Value.RenteeFirstName.ToLower(), BCrypt.Net.BCrypt.GenerateSalt())
            };

            _unitOfWork.Users.Add(admin).Wait();
            _unitOfWork.Users.Add(owner).Wait();
            _unitOfWork.Users.Add(rentee).Wait();
            _unitOfWork.Save().Wait();
        }
    }
}
