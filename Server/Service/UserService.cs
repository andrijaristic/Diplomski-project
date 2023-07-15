using AutoMapper;
using Contracts.UserDTOs;
using Domain.Enums;
using Domain.Exceptions.UserExceptions;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Domain.Models;
using Domain.Models.AppSettings;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IOptions<AppSettings> _settings;

        public UserService(IMapper mapper, IUnitOfWork unitOfWork, IOptions<AppSettings> settings) 
        {
            _mapper = mapper;
            _unitOfWork= unitOfWork;
            _settings= settings;
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

            await _unitOfWork.Users.Add(user);
            await _unitOfWork.Save();

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
            ValidateRole(newUserDTO.Role);
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
