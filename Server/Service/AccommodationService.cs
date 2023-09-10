using AutoMapper;
using Contracts.AccommodationDTOs;
using Contracts.Common;
using Domain.Exceptions.PropertyExceptions;
using Domain.Exceptions.PropertyUtilityExceptions;
using Domain.Exceptions.UserExceptions;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Domain.Models;
using Domain.Models.AppSettings;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Service.Helpers;

namespace Service
{
    public class AccommodationService : IAccommodationService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IOptions<AppSettings> _settings;
        private readonly IHostEnvironment _hostEnvironment;
        public AccommodationService(IUnitOfWork unitOfWork, IMapper mapper, IOptions<AppSettings> settings, IHostEnvironment hostEnvironment)
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

            Accommodation accommodation = await _unitOfWork
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

        public async Task<PagedListDTO<DisplayAccommodationDTO>> GetAccommodations(SearchParamsDTO searchParamsDTO, string username)
        {
            IEnumerable<Accommodation> accommodations = await _unitOfWork
                                                        .Properties
                                                        .GetFilteredAcccommodations(searchParamsDTO);
            if (accommodations == null)
            {
                throw new InvalidSearchParamsException();
            }

            PagedListDTO<DisplayAccommodationDTO> dtos =
                PaginationHelper<Accommodation, DisplayAccommodationDTO>
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

                foreach (Accommodation accommodation in accommodations)
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

        public async Task<List<AccommodationPreviewDTO>> GetHighestRatedAccommodations()
        {
            List<Accommodation> accommodations = await _unitOfWork
                                                    .Properties
                                                    .GetHighestRatedAccommodations();
            return _mapper.Map<List<AccommodationPreviewDTO>>(accommodations);
        }

        public async Task<List<DisplayAccommodationDTO>> GetUserAccommodations(Guid userId)
        {
            List<Accommodation> accommodations = await _unitOfWork
                                                    .Properties
                                                    .GetUserAccommodations(userId);
            return _mapper.Map<List<DisplayAccommodationDTO>>(accommodations);
        }

        public async Task<DetailedAccommodationDTO> GetById(Guid id)
        {
            Accommodation accommodation = await _unitOfWork
                                            .Properties
                                            .GetFullAccommodationById(id);
            if (accommodation is null)
            {
                throw new PropertyNotFoundException(id);
            }

            for (int i = 0; i < accommodation.Images.Count; i++)
            {
                accommodation.Images[i].ImageURL = accommodation.Images[i].ImageURL
                                                      .StartsWith("https://") ?
                                                            accommodation.Images[i].ImageURL :
                                                            _settings.Value.DefaultImagePath + accommodation.Images[i].ImageURL;
            }

            return _mapper.Map<DetailedAccommodationDTO>(accommodation);
        }

        public async Task<DetailedAccommodationDTO> AddAccommodationImage(Guid id, AddAccommodationImageDTO addAccommodationImageDTO, string username)
        {
            User user = await _unitOfWork
                                    .Users
                                    .FindByUsername(username);
            if (user is null)
            {
                throw new UserNotFoundException(username);
            }

            if (user.Id != addAccommodationImageDTO.UserId)
            {
                throw new InvalidUserIdInNewPropertyException();
            }

            Accommodation accommodation = await _unitOfWork
                                            .Properties
                                            .GetFullAccommodationById(id);
            if (accommodation is null)
            {
                throw new PropertyNotFoundException(id);
            }

            AccommodationImage image = new AccommodationImage()
            {
                ImageURL = addAccommodationImageDTO.Image is null ?
                                        _settings.Value.DefaultImagePath :
                                        await ImageHelper.SaveImage(addAccommodationImageDTO.Image,
                                                                    accommodation.Id,
                                                                    _hostEnvironment.ContentRootPath)
            };

            if (accommodation.Images.Count == 5)
            {
                throw new PropertyImageAmountExceededException();
            }

            accommodation.Images.Add(image);
            await _unitOfWork.Save();

            return _mapper.Map<DetailedAccommodationDTO>(accommodation);
        }

        public async Task<DisplayAccommodationDTO> CreateAccommodation(NewAccommodationDTO newAccommodationDTO, string username)
        {
            ValidateNewProperty(newAccommodationDTO);

            User user = await _unitOfWork
                                    .Users
                                    .FindByUsername(username);
            if (user is null)
            {
                throw new UserNotFoundException(username);
            }

            if (user.Id != newAccommodationDTO.UserId)
            {
                throw new InvalidUserIdInNewPropertyException();
            }

            if (user.Role != Domain.Enums.UserType.OWNER)
            {
                throw new InvalidPropertyUserRoleException();
            }

            if (!user.IsVerified || user.VerificationStatus == Domain.Enums.VerificationStatus.REJECTED)
            {
                throw new UserNotVerifiedException();
            }


            Accommodation property = _mapper.Map<Accommodation>(newAccommodationDTO);
            property.Utilities = new List<Amenity>();
            foreach (Guid utilityId in newAccommodationDTO.Utilities)
            {
                Amenity utility = await _unitOfWork
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
                ImageURL = newAccommodationDTO.ThumbnailImage is null ?
                                        _settings.Value.DefaultImagePath :
                                        await ImageHelper.SaveImage(newAccommodationDTO.ThumbnailImage,
                                                                    property.Id,
                                                                    _hostEnvironment.ContentRootPath)
            };

            await _unitOfWork.Save();

            return _mapper.Map<DisplayAccommodationDTO>(property);
        }

        public async Task<DisplayAccommodationDTO> UpdateBasicAccommodationInformation(Guid id, UpdateBasicAccommodationInformationDTO updatePropertyDTO, string username)
        {
            ValidateUpdateProperty(updatePropertyDTO);

            Accommodation property = await _unitOfWork
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

            return _mapper.Map<DisplayAccommodationDTO>(property);
        }

        public async Task DeleteAccommodation(Guid id, string username)
        {
            Accommodation property = await _unitOfWork
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

        private static void ValidateNewProperty(NewAccommodationDTO newAccommodationDTO)
        {
            ValidateName(newAccommodationDTO.Name);
            ValidateDescription(newAccommodationDTO.Description);
        }

        private static void ValidateUpdateProperty(UpdateBasicAccommodationInformationDTO updateAccommodationDTO)
        {
            ValidateName(updateAccommodationDTO.Name);
            ValidateDescription(updateAccommodationDTO.Description);
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
