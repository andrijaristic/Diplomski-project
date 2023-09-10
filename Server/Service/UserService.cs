using AutoMapper;
using Contracts.UserDTOs;
using Domain.Enums;
using Domain.Exceptions.UserExceptions;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Domain.Interfaces.Utilities;
using Domain.Models;
using Domain.Models.AppSettings;
using Microsoft.Extensions.Options;
using System.Text.RegularExpressions;

namespace Service
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthUtility _authUtility;
        private readonly IEmailUtility _emailUtility;
        private readonly IOptions<AppSettings> _settings;

        public UserService(IMapper mapper,
                           IUnitOfWork unitOfWork,
                           IAuthUtility authUtility,
                           IOptions<AppSettings> settings,
                           IEmailUtility emailUtility)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _authUtility = authUtility;
            _settings = settings;
            _emailUtility = emailUtility;
        }

        public async Task<DisplayUserDTO> GetById(Guid id)
        {
            User user = await _unitOfWork
                                    .Users
                                    .Find(id);
            if (user == null)
            {
                throw new UserByIdNotFoundException(id);
            }

            return _mapper.Map<DisplayUserDTO>(user);
        }

        public async Task<List<DisplayUserDTO>> GetUnverifiedUsers()
        {
            List<User> users = await _unitOfWork
                                            .Users
                                            .GetUnverifiedUsers();
            return _mapper.Map<List<DisplayUserDTO>>(users);
        }

        public async Task<AuthDTO> Login(LoginDTO loginDTO)
        {
            User user = await _unitOfWork
                                    .Users
                                    .FindByUsername(loginDTO.Username);
            if (user == null)
            {
                throw new InvalidUsernameException();
            }

            if (!BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.Password))
            {
                throw new InvalidPasswordException();
            }

            AuthDTO authDTO = new AuthDTO()
            {
                Token = _authUtility.CreateToken(user.Id,
                                                 user.Username,
                                                 user.FirstName,
                                                 user.LastName,
                                                 user.Role,
                                                 _settings.Value.SecretKey,
                                                 _settings.Value.TokenIssuer,
                                                 _settings.Value.TokenDuration),

                VerificationStatus = user.VerificationStatus.ToString().Trim(),
                IsVerified = user.IsVerified
            };

            return authDTO;
        }

        public async Task<AuthDTO> ExternalLogin(ExternalLoginDTO externalLoginDTO)
        {
            if (!Enum.TryParse(externalLoginDTO.Service, out ExternalLoginServices service))
            {
                throw new InvalidExternalLoginServiceException(externalLoginDTO.Service);
            }

            if (!Enum.TryParse(externalLoginDTO.Role, out UserType userType))
            {
                throw new InvalidRoleException(externalLoginDTO.Role);
            }

            SocialMediaDTO socialMediaDTO = await _authUtility.VerifyGoogleToken(externalLoginDTO, _settings.Value.GoogleClientId);
            if (socialMediaDTO == null)
            {
                throw new InvalidServiceTokenException();
            }

            User user = await _unitOfWork.Users.FindByUsername(socialMediaDTO.Username);
            if (user == null)
            {
                user = new User()
                {
                    Username = socialMediaDTO.Username,
                    Password = BCrypt.Net.BCrypt.HashPassword(_settings.Value.DefaultPassword, BCrypt.Net.BCrypt.GenerateSalt()),
                    FirstName = socialMediaDTO.FirstName,
                    LastName = socialMediaDTO.LastName,
                    Email = socialMediaDTO.Email,
                    Country = _settings.Value.DefaultCountry,
                    PhoneNumber = _settings.Value.DefaultPhoneNumber,
                    Role = userType,
                    IsVerified = userType != UserType.OWNER,
                };

                user.VerificationStatus = user.IsVerified ? VerificationStatus.ACCEPTED : VerificationStatus.REJECTED;

                await _unitOfWork.Users.Add(user);
                await _unitOfWork.Save();
            }

            AuthDTO authDTO = new AuthDTO()
            {
                Token = _authUtility.CreateToken(user.Id, user.Username, user.FirstName, user.LastName, user.Role, _settings.Value.SecretKey, _settings.Value.TokenIssuer, _settings.Value.TokenDuration),
                IsVerified = user.IsVerified,
                VerificationStatus = user.VerificationStatus.ToString()
            };

            return authDTO;
        }

        public async Task<DisplayUserDTO> CreateUser(NewUserDTO newUserDTO)
        {
            bool exists = await _unitOfWork.Users.FindByUsername(newUserDTO.Username) != null;
            if (exists)
            {
                throw new UserUsernameExistsException();
            }

            ValidateNewUser(newUserDTO);

            User user = _mapper.Map<User>(newUserDTO);
            user.Password = BCrypt.Net.BCrypt.HashPassword(newUserDTO.Password, BCrypt.Net.BCrypt.GenerateSalt());

            user.IsVerified = user.Role != UserType.OWNER;
            user.VerificationStatus = user.IsVerified ? VerificationStatus.ACCEPTED : VerificationStatus.PENDING;

            await _unitOfWork.Users.Add(user);
            await _unitOfWork.Save();

            return _mapper.Map<DisplayUserDTO>(user);
        }

        public async Task<DisplayUserDTO> UpdateUser(UpdateUserDTO updateUserDTO, string username)
        {
            User user = await _unitOfWork.Users.Find(updateUserDTO.Id);
            if (user == null)
            {
                throw new UserByIdNotFoundException(updateUserDTO.Id);
            }

            if (!String.Equals(user.Username, username))
            {
                throw new InvalidUserInformationException();
            }

            ValidateUserUpdate(updateUserDTO);

            user.FirstName = updateUserDTO.FirstName;
            user.LastName = updateUserDTO.LastName;
            user.Email = updateUserDTO.Email;
            user.Country = updateUserDTO.Country;
            user.PhoneNumber = updateUserDTO.PhoneNumber;

            await _unitOfWork.Save();

            return _mapper.Map<DisplayUserDTO>(user);
        }

        public async Task<DisplayUserDTO> ChangePassword(Guid id, ChangePasswordDTO changePasswordDTO, string username)
        {
            User user = await _unitOfWork.Users.Find(id);
            if (user == null)
            {
                throw new UserByIdNotFoundException(id);
            }

            if (!String.Equals(user.Username, username))
            {
                throw new InvalidUserInformationException();
            }

            if (!BCrypt.Net.BCrypt.Verify(changePasswordDTO.CurrentPassword, user.Password))
            {
                throw new InvalidPasswordException();
            }

            ValidatePassword(changePasswordDTO.NewPassword);

            user.Password = BCrypt.Net.BCrypt.HashPassword(changePasswordDTO.NewPassword, BCrypt.Net.BCrypt.GenerateSalt());

            await _unitOfWork.Save();

            return _mapper.Map<DisplayUserDTO>(user);
        }

        public async Task<DisplayUserDTO> VerifyUser(Guid id, bool isAccepted)
        {
            User user = await _unitOfWork.Users.Find(id);
            if (user == null)
            {
                throw new UserByIdNotFoundException(id);
            }

            if (user.Role != UserType.OWNER)
            {
                throw new InvalidRoleForVerificationException(user.Role.ToString());
            }

            if (user.IsVerified)
            {
                throw new UserAlreadyVerifiedException();
            }

            user.IsVerified = isAccepted;
            user.VerificationStatus = isAccepted ? VerificationStatus.ACCEPTED :
                                                   VerificationStatus.REJECTED;

            await _unitOfWork.Save();
            await _emailUtility.SendEmail(user.Email, $"{user.FirstName} {user.LastName}", user.IsVerified);

            return _mapper.Map<DisplayUserDTO>(user);
        }

        // Validations
        private void ValidateNewUser(NewUserDTO newUserDTO)
        {
            ValidateUsername(newUserDTO.Username);
            ValidatePassword(newUserDTO.Password);
            ValidateFirstName(newUserDTO.FirstName);
            ValidateLastName(newUserDTO.LastName);
            ValidateEmail(newUserDTO.Email);
            ValidateCountry(newUserDTO.Country);
            ValidatePhoneNumber(newUserDTO.PhoneNumber);
            ValidateRole(newUserDTO.Role);
        }

        private void ValidateUserUpdate(UpdateUserDTO updateUserDTO)
        {
            ValidateFirstName(updateUserDTO.FirstName);
            ValidateLastName(updateUserDTO.LastName);
            ValidateCountry(updateUserDTO.Country);
            ValidatePhoneNumber(updateUserDTO.PhoneNumber);
            ValidateEmail(updateUserDTO.Email);
        }

        private void ValidateUsername(string username)
        {
            if (string.IsNullOrWhiteSpace(username) ||
                username.Length <= _settings.Value.MinUsernameLength)
            {
                throw new InvalidUsernameException();
            }
        }

        private void ValidatePassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password) ||
                password.Length <= _settings.Value.MinPasswordLength)
            {
                throw new InvalidPasswordException();
            }
        }

        private void ValidateFirstName(string firstName)
        {
            if (string.IsNullOrWhiteSpace(firstName))
            {
                throw new InvalidInputFieldException(nameof(firstName).ToUpper());
            }
        }

        private void ValidateLastName(string lastName)
        {
            if (string.IsNullOrWhiteSpace(lastName))
            {
                throw new InvalidInputFieldException(nameof(lastName).ToUpper());
            }
        }

        private void ValidateCountry(string country)
        {
            if (string.IsNullOrWhiteSpace(country))
            {
                throw new InvalidInputFieldException(nameof(country).ToUpper());
            }
        }

        private void ValidatePhoneNumber(string phoneNumber)
        {
            Regex phoneNumberRegex = new Regex(_settings.Value.PhoneNumberRegex,
                                               RegexOptions.Compiled);

            if (string.IsNullOrWhiteSpace(phoneNumber) ||
                !phoneNumberRegex.Match(phoneNumber).Success)
            {
                throw new InvalidInputFieldException(nameof(phoneNumber).ToUpper());
            }
        }

        private void ValidateEmail(string email)
        {
            Regex emailRegex = new Regex(_settings.Value.EmailRegex,
                                         RegexOptions.Compiled);

            if (string.IsNullOrWhiteSpace(email) ||
                !emailRegex.Match(email).Success)
            {
                throw new InvalidInputFieldException(nameof(email).ToUpper());
            }

        }

        private void ValidateRole(string role)
        {
            if (!Enum.TryParse<UserType>(role, out UserType userType))
            {
                throw new InvalidRoleException(role);
            }
        }
    }
}
