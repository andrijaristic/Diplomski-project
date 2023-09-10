﻿using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using AutoMapper;
using Domain.Models;
using Domain.Models.AppSettings;
using Contracts.Common;
using Contracts.PropertyDTOs;
using Service.Helpers;
using Domain.Exceptions.PropertyExceptions;
using Domain.Exceptions.UserExceptions;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Domain.Exceptions.PropertyUtilityExceptions;
using Contracts.PropertyUtilityDTOs;
using Microsoft.IdentityModel.Tokens;
using System.Security.AccessControl;

namespace Service
{
    public class PropertyService : IPropertyService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IOptions<AppSettings> _settings;
        private readonly IHostEnvironment _hostEnvironment;
        public PropertyService(IUnitOfWork unitOfWork, IMapper mapper, IOptions<AppSettings> settings, IHostEnvironment hostEnvironment)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _settings = settings;
            _hostEnvironment = hostEnvironment;
        }

        public async Task ToggleAccommodationFavoriteStatus(Guid accommodationId, string username)
        {
            User user = await _unitOfWork
                                    .Users
                                    .FindByUsername(username);
            if (user is null)
            {
                throw new UserNotFoundException(username);
            }

            Property accommodation = await _unitOfWork
                                                .Properties
                                                .GetWithFavorites(accommodationId);
            if (accommodation is null) 
            {
                throw new PropertyNotFoundException(accommodationId);
            }

            SavedProperty? savedProperty = accommodation
                                            .SavedProperties
                                            .FirstOrDefault(sp => sp.UserId == user.Id &&
                                                            sp.PropertyId == accommodation.Id);
            if (savedProperty is null)
            {
                savedProperty = new SavedProperty()
                {
                    UserId = user.Id,
                    PropertyId = accommodation.Id
                };
                accommodation.SavedProperties.Add(savedProperty);
            } 
            else
            {
                accommodation.SavedProperties.Remove(savedProperty);
            }

            await _unitOfWork.Save();
        }

        public async Task<PagedListDTO<DisplayPropertyDTO>> GetAccommodations(SearchParamsDTO searchParamsDTO, string username)
        {
            IEnumerable<Property> accommodations = await _unitOfWork
                                                        .Properties
                                                        .GetFilteredAcccommodations(searchParamsDTO);
            if (accommodations == null)
            {
                throw new InvalidSearchParamsException();
            }

            PagedListDTO<DisplayPropertyDTO> dtos =  
                PaginationHelper<Property, DisplayPropertyDTO>
                .CreatePagedListDTO(accommodations,
                                    searchParamsDTO.Page,
                                    _settings.Value.AccommodationsPageSize,
                                    _mapper);

            if (username is not null)
            {
                User user = await _unitOfWork
                                        .Users
                                        .FindByUsername(username);

                if (user is null)
                {
                    return dtos;
                }

                foreach (Property accommodation in accommodations)
                {
                    dtos.Items
                        .Where(item => item.Id == accommodation.Id)
                        .First().IsSaved = accommodation
                                                .SavedProperties
                                                .Any(acc => acc.UserId == user.Id);
                }
            }

            return dtos;
        }

        public async Task<List<PropertyPreviewDTO>> GetHighestRatedAccommodations()
        {
            List<Property> properties = await _unitOfWork
                                                    .Properties
                                                    .GetHighestRatedAccommodations();
            return _mapper.Map<List<PropertyPreviewDTO>>(properties);
        }

        public async Task<List<DisplayPropertyDTO>> GetUserAccommodations(Guid userId)
        {
            List<Property> properties = await _unitOfWork
                                                    .Properties
                                                    .GetUserAccommodations(userId);
            return _mapper.Map<List<DisplayPropertyDTO>>(properties);
        }

        public async Task<DetailedPropertyDTO> GetById(Guid id)
        {
            Property property = await _unitOfWork
                                            .Properties
                                            .GetFullPropertyById(id);
            if (property is null)
            {
                throw new PropertyNotFoundException(id);
            }

            for (int i = 0; i < property.Images.Count; i++)
            {
                property.Images[i].ImageURL = property.Images[i].ImageURL
                                                      .StartsWith("https://") ? 
                                                            property.Images[i].ImageURL : 
                                                            _settings.Value.DefaultImagePath + property.Images[i].ImageURL;
            }

            return _mapper.Map<DetailedPropertyDTO>(property);   
        }

        public async Task<DetailedPropertyDTO> AddPropertyImage(Guid id, AddPropertyImageDTO addPropertyImageDTO, string username)
        {
            User user = await _unitOfWork
                                    .Users
                                    .FindByUsername(username);
            if (user is null)
            {
                throw new UserNotFoundException(username);
            }

            if (user.Id != addPropertyImageDTO.UserId)
            {
                throw new InvalidUserIdInNewPropertyException();
            }

            Property property = await _unitOfWork
                                            .Properties
                                            .GetFullPropertyById(id);
            if (property is null)
            {
                throw new PropertyNotFoundException(id);
            }

            AccommodationImage image = new AccommodationImage()
            {
                ImageURL = addPropertyImageDTO.Image is null ?
                                        _settings.Value.DefaultImagePath :
                                        await ImageHelper.SaveImage(addPropertyImageDTO.Image, 
                                                                    property.Id, 
                                                                    _hostEnvironment.ContentRootPath)
            };

            if (property.Images.Count == 5) 
            {
                throw new PropertyImageAmountExceededException();
            }

            property.Images.Add(image);
            await _unitOfWork.Save();

            return _mapper.Map<DetailedPropertyDTO>(property);
        }

        public async Task<DisplayPropertyDTO> CreateProperty(NewPropertyDTO newPropertyDTO, string username)
        {
            ValidateNewProperty(newPropertyDTO);

            User user = await _unitOfWork
                                    .Users
                                    .FindByUsername(username);
            if (user is null)
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

            if (!user.IsVerified || user.VerificationStatus == Domain.Enums.VerificationStatus.REJECTED)
            {
                throw new UserNotVerifiedException();
            }


            Property property = _mapper.Map<Property>(newPropertyDTO);
            property.Utilities = new List<PropertyUtility>();
            foreach (Guid utilityId in newPropertyDTO.Utilities)
            {
                PropertyUtility utility = await _unitOfWork
                                                    .PropertyUtilities
                                                    .Find(utilityId);
                if (utility is null)
                {
                    throw new UtilityNotFoundException(utilityId);
                }
                property.Utilities.Add(utility);
            }

            await _unitOfWork.Properties.Add(property);

            property.ThumbnailImage = new AccommodationImage() 
            {
                ImageURL = newPropertyDTO.ThumbnailImage is null ?
                                        _settings.Value.DefaultImagePath :
                                        await ImageHelper.SaveImage(newPropertyDTO.ThumbnailImage, 
                                                                    property.Id, 
                                                                    _hostEnvironment.ContentRootPath)
            };

            await _unitOfWork.Save();

            return _mapper.Map<DisplayPropertyDTO>(property); 
        }

        public async Task<DisplayPropertyDTO> UpdateBasicPropertyInformation(Guid id, UpdateBasicPropertyInformationDTO updatePropertyDTO, string username)
        {
            ValidateUpdateProperty(updatePropertyDTO);

            Property property = await _unitOfWork
                                            .Properties
                                            .Find(id);
            if (property is null)
            {
                throw new PropertyNotFoundException(id);
            }

            User user = await _unitOfWork
                                    .Users
                                    .FindByUsername(username);
            if (user is null)
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
            Property property = await _unitOfWork
                                            .Properties
                                            .Find(id);
            if (property == null)
            {
                throw new PropertyNotFoundException(id);
            }

            User user = await _unitOfWork
                                    .Users
                                    .FindByUsername(username);
            if (user is null)
            {
                throw new UserNotFoundException(username);
            }

            if (user.Id != property.UserId)
            {
                throw new InvalidUserInPropertyException();
            }

            //_unitOfWork.Properties.Remove(property);
            property.IsDeleted = true;
            await _unitOfWork.Save();
        }

        // Validations

        private static void ValidateNewProperty(NewPropertyDTO newPropertyDTO)
        {
            ValidateName(newPropertyDTO.Name);
            ValidateDescription(newPropertyDTO.Description);
        }

        private static void ValidateUpdateProperty(UpdateBasicPropertyInformationDTO updatePropertyDTO)
        {
            ValidateName(updatePropertyDTO.Name);
            ValidateDescription(updatePropertyDTO.Description);
        }

        private static void ValidateName(string name)
        {
            if (String.IsNullOrWhiteSpace(name))
            {
                throw new InvalidPropertyNameException(name);
            }
        }

        private static void ValidateDescription(string description)
        {
            if (String.IsNullOrWhiteSpace(description))
            {
                throw new InvalidPropertyDescriptionException(description);
            }
        }
    }
}
