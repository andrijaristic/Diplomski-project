﻿using Domain.Exceptions.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Exceptions.UserExceptions
{
    public class InvalidRoleForVerificationException : BadRequestException
    {
        public InvalidRoleForVerificationException(string role) : base($"{role} is not eligible for verification.")
        {

        }
    }
}