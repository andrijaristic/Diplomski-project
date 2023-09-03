﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contracts.PropertyDTOs
{
    public class AddPropertyImageDTO
    {
        public Guid UserId { get; set; }
        public IFormFile Image { get; set; }
    }
}