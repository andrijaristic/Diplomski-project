using AutoMapper;
using Contracts.PropertyDTOs;
using Domain.Exceptions.PropertyExceptions;
using Domain.Exceptions.UserExceptions;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    public class PropertyService : IPropertyService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public PropertyService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // TODO: Implement image handling
        public async Task<DisplayPropertyDTO> CreateProperty(NewPropertyDTO newPropertyDTO, string username)
        {
            ValidateNewProperty(newPropertyDTO);

            User user = await _unitOfWork.Users.FindByUsername(username);
            if (user == null)
            {
                throw new UserNotFoundException(username);
            }

            if (user.Id != newPropertyDTO.UserId)
            {
                throw new InvalidUserIdInNewPropertyException();
            }

            if (user.Role != Domain.Enums.UserType.PROPERTYOWNER)
            {
                throw new InvalidPropertyUserRoleException();
            }

            Property property = _mapper.Map<Property>(newPropertyDTO);

            await _unitOfWork.Properties.Add(property);
            await _unitOfWork.Save();

            return _mapper.Map<DisplayPropertyDTO>(property); 
        }

        public async Task<DisplayPropertyDTO> UpdateProperty(Guid id, UpdatePropertyDTO updatePropertyDTO, string username)
        {
            ValidateUpdateProperty(updatePropertyDTO);

            Property property = await _unitOfWork.Properties.Find(id);
            if (property == null)
            {
                throw new PropertyNotFoundException(id);
            }

            User user = await _unitOfWork.Users.FindByUsername(username);
            if (user == null)
            {
                throw new UserNotFoundException(username);
            }

            if (user.Id != updatePropertyDTO.UserId) 
            { 
                throw new InvalidUserInPropertyException();
            }

            property.Name = updatePropertyDTO.Name.Trim();
            property.Description = updatePropertyDTO.Description.Trim();

            await _unitOfWork.Save();

            return _mapper.Map<DisplayPropertyDTO>(property);
        }

        // Validations
        // TODO: Add validations for images

        private void ValidateNewProperty(NewPropertyDTO newPropertyDTO)
        {
            ValidateName(newPropertyDTO.Name);
            ValidateDescription(newPropertyDTO.Description);
        }

        private void ValidateUpdateProperty(UpdatePropertyDTO updatePropertyDTO)
        {
            ValidateName(updatePropertyDTO.Name);
            ValidateDescription(updatePropertyDTO.Description);
        }

        private void ValidateName(string name)
        {
            if (String.IsNullOrWhiteSpace(name))
            {
                throw new InvalidPropertyNameException(name);
            }
        }

        private void ValidateDescription(string description)
        {
            if (String.IsNullOrWhiteSpace(description))
            {
                throw new InvalidPropertyDescriptionException(description);
            }
        }
    }
}
