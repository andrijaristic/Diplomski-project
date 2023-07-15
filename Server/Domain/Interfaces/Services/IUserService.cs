﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Contracts.UserDTOs;

namespace Domain.Interfaces.Services
{
    public interface IUserService
    {
        Task<DisplayUserDTO> CreateUser(NewUserDTO newUserDTO);
        Task<AuthDTO> Login(LoginDTO loginDTO);
        Task<DisplayUserDTO> GetById(Guid id);
        Task<DisplayUserDTO> UpdateUser(UpdateUserDTO updateUserDTO, string username);
        Task<DisplayUserDTO> ChangePassword(Guid id, ChangePasswordDTO changePasswordDTO, string username);
    }
}
