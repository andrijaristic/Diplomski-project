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
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAuthUtility _authUtility;
        private readonly IOptions<AppSettings> _settings;

        public UserService(IMapper mapper, IUnitOfWork unitOfWork, IAuthUtility authUtility, IOptions<AppSettings> settings) 
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _authUtility = authUtility;
            _settings = settings;
        }

        public async Task<DisplayUserDTO> GetById(Guid id)
        {
            User user = await _unitOfWork.Users.Find(id);
            if (user == null)
            {
                throw new UserByIdNotFoundException(id);
            }

            return _mapper.Map<DisplayUserDTO>(user);
        }

        public async Task<AuthDTO> Login(LoginDTO loginDTO)
        {
            User user = await _unitOfWork.Users.FindByUsername(loginDTO.Username);
            if(user == null)
            {
                throw new InvalidUsernameException();
            }

            if (!BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.Password))
            {
                throw new InvalidPasswordException();
            }

            AuthDTO authDTO = new AuthDTO()
            {
                Token = _authUtility.CreateToken(user.Id, user.Username, user.Role, _settings.Value.SecretKey, _settings.Value.TokenIssuer, _settings.Value.TokenDuration),
                VerificationStatus = user.VerificationStatus.ToString().Trim(),
                IsVerified = user.IsVerified
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

            user.IsVerified = user.Role != UserType.PROPERTY_OWNER;
            user.VerificationStatus = user.IsVerified ? VerificationStatus.ACCEPTED : VerificationStatus.REJECTED;

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

        // Validations
        // TODO: Add proper validations for certain fields (ex. email & phone number) with regex
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
            if (string.IsNullOrWhiteSpace(username) || username.Length <= _settings.Value.MinUsernameLength)
            {
                throw new InvalidUsernameException();
            }
        }

        private void ValidatePassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password) || password.Length <= _settings.Value.MinPasswordLength)
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
            if (string.IsNullOrWhiteSpace(phoneNumber))
            {
                throw new InvalidInputFieldException(nameof(phoneNumber).ToUpper());
            }
        }

        private void ValidateEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
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
