﻿using Contracts.PropertyDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Services
{
    public interface IPropertyService
    {
        Task<DisplayPropertyDTO> CreateProperty(NewPropertyDTO newPropertyDTO, string username);
        Task<DisplayPropertyDTO> UpdateProperty(Guid id, UpdatePropertyDTO updatePropertyDTO, string username);
        Task DeleteProperty(Guid id, string username);
        Task<DisplayPropertyDTO> GetById(Guid id);
        Task<DisplayPropertyDTO> VerifyProperty(Guid id, bool isAccepted);
    }
}