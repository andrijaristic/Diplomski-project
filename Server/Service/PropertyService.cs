using AutoMapper;
using Contracts.Common;
using Contracts.PropertyDTOs;
using Domain.Exceptions.PropertyExceptions;
using Domain.Exceptions.UserExceptions;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Domain.Models;
using Domain.Models.AppSettings;
using Microsoft.Extensions.Options;
using Service.Helpers;
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
        private readonly IOptions<AppSettings> _settings;
        public PropertyService(IUnitOfWork unitOfWork, IMapper mapper, IOptions<AppSettings> settings)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _settings = settings;
        }

        public async Task<PagedListDTO<DisplayPropertyDTO>> GetAccommodations(SearchParamsDTO searchParamsDTO)
        {
            IEnumerable<Property> accommodations = await _unitOfWork.Properties.GetFilteredAcccommodations(searchParamsDTO);
            if (accommodations == null)
            {
                throw new InvalidSearchParamsException();
            }

            return PaginationHelper<Property, DisplayPropertyDTO>.CreatePagedListDTO(accommodations,
                                                                                     searchParamsDTO.Page,
                                                                                     _settings.Value.AccommodationsPageSize,
                                                                                     _mapper);
        }

        public async Task<DisplayPropertyDTO> GetById(Guid id)
        {
            Property property = await _unitOfWork.Properties.Find(id);
            if (property == null)
            {
                throw new PropertyNotFoundException(id);
            }

            return _mapper.Map<DisplayPropertyDTO>(property);   
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

        public async Task DeleteProperty(Guid id, string username)
        {
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

            if (user.Id != property.UserId)
            {
                throw new InvalidUserInPropertyException();
            }

            // TODO?: Implement logical deletion
            _unitOfWork.Properties.Remove(property);
            await _unitOfWork.Save();
        }

        public async Task<DisplayPropertyDTO> VerifyProperty(Guid id, bool isAccepted)
        {
            Property property = await _unitOfWork.Properties.Find(id); 
            if (property == null)
            {
                throw new PropertyNotFoundException(id);
            }

            if (property.IsVerified)
            {
                throw new PropertyAlreadyVerifiedException();
            }

            property.IsVerified = true;
            property.VerificationStatus = isAccepted ? Domain.Enums.VerificationStatus.ACCEPTED : Domain.Enums.VerificationStatus.REJECTED;

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
