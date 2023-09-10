using AutoMapper;
using Contracts.AccommodationDTOs;
using Contracts.Common;
using Domain.Exceptions.AccommodationExceptions;
using Domain.Exceptions.AmenityExceptions;
using Domain.Exceptions.UserExceptions;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Domain.Models;
using Domain.Models.AppSettings;
using MailKit;
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
                                                        .Accommodations
                                                        .GetWithFavorites(accommodationId);
            if (accommodation is null)
            {
                throw new AccommodationNotFoundException(accommodationId);
            }

            SavedAccommodation? savedProperty = accommodation
                                                        .SavedAccommodations
                                                        .FirstOrDefault(sp => sp.UserId == user.Id &&
                                                                        sp.AccommodationId == accommodation.Id);
            if (savedProperty is null)
            {
                savedProperty = new SavedAccommodation()
                {
                    UserId = user.Id,
                    AccommodationId = accommodation.Id
                };
                accommodation.SavedAccommodations.Add(savedProperty);
            }
            else
            {
                accommodation.SavedAccommodations.Remove(savedProperty);
            }

            await _unitOfWork.Save();
        }

        public async Task<PagedListDTO<DisplayAccommodationDTO>> GetAccommodations(SearchParamsDTO searchParamsDTO, string username)
        {
            IEnumerable<Accommodation> accommodations = await _unitOfWork
                                                                    .Accommodations
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
                    DisplayAccommodationDTO dto = dtos.Items
                                                        .Where(item => item.Id == accommodation.Id)
                                                        .First();

                    dto.IsSaved = accommodation
                                        .SavedAccommodations
                                        .Any(acc => acc.UserId == user.Id);
                    dto.Comments = accommodation.Comments.Count();
                }
            }

            return dtos;
        }

        public async Task<List<AccommodationPreviewDTO>> GetHighestRatedAccommodations()
        {
            List<Accommodation> accommodations = await _unitOfWork
                                                            .Accommodations
                                                            .GetHighestRatedAccommodations();
            return _mapper.Map<List<AccommodationPreviewDTO>>(accommodations);
        }

        public async Task<List<DisplayAccommodationDTO>> GetUserAccommodations(Guid userId)
        {
            List<Accommodation> accommodations = await _unitOfWork
                                                            .Accommodations
                                                            .GetUserAccommodations(userId);
            return _mapper.Map<List<DisplayAccommodationDTO>>(accommodations);
        }

        public async Task<DetailedAccommodationDTO> GetById(Guid id)
        {
            Accommodation accommodation = await _unitOfWork
                                                        .Accommodations
                                                        .GetFullAccommodationById(id);
            if (accommodation is null)
            {
                throw new AccommodationNotFoundException(id);
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
                throw new InvalidUserIdInNewAccommodationException();
            }

            Accommodation accommodation = await _unitOfWork
                                                    .Accommodations
                                                    .GetFullAccommodationById(id);
            if (accommodation is null)
            {
                throw new AccommodationNotFoundException(id);
            }

            AccommodationImage image = new AccommodationImage()
            {
                ImageURL = addAccommodationImageDTO.Image is null ?
                                        _settings.Value.DefaultImagePath :
                                        await ImageHelper.SaveImage(addAccommodationImageDTO.Image,
                                                                    accommodation.Id,
                                                                    _hostEnvironment.ContentRootPath),
            };

            if (accommodation.Images.Count == 5)
            {
                throw new AccommodationImageAmountExceededException();
            }

            accommodation.Images.Add(image);
            await _unitOfWork.Save();

            return _mapper.Map<DetailedAccommodationDTO>(accommodation);
        }

        public async Task<DetailedAccommodationDTO> DeleteAccommodationImage(Guid accomodationId, DeleteImageDTO deleteImageDTO, string username)
        {
            User user = await _unitOfWork
                                    .Users
                                    .FindByUsername(username);
            if (user is null)
            {
                throw new UserNotFoundException(username);
            }

            if (user.Id != deleteImageDTO.UserId)
            {
                throw new InvalidUserIdInNewAccommodationException();
            }

            Accommodation accommodation = await _unitOfWork
                                                    .Accommodations
                                                    .GetFullAccommodationById(accomodationId);
            if (accommodation is null)
            {
                throw new AccommodationNotFoundException(accomodationId);
            }

            if (accommodation.ThumbnailImage.Id == deleteImageDTO.ImageId)
            {
                throw new InvalidImageDeletePermission();
            }

            AccommodationImage? image = accommodation
                                                .Images
                                                .Where(x => x.Id == deleteImageDTO.ImageId)
                                                .FirstOrDefault();
            if (image is not null)
            {
                accommodation.Images.Remove(image);
                ImageHelper.DeleteImage(image.ImageURL, _hostEnvironment.ContentRootPath);

                _unitOfWork.AccommodationImages.Remove(image);
            }

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
                throw new InvalidUserIdInNewAccommodationException();
            }

            if (user.Role != Domain.Enums.UserType.OWNER)
            {
                throw new InvalidAccomodationUserRoleException();
            }

            if (!user.IsVerified || user.VerificationStatus == Domain.Enums.VerificationStatus.REJECTED)
            {
                throw new UserNotVerifiedException();
            }


            Accommodation accommodation = _mapper.Map<Accommodation>(newAccommodationDTO);
            accommodation.Amenities = new List<Amenity>();
            foreach (Guid utilityId in newAccommodationDTO.Amenities)
            {
                Amenity utility = await _unitOfWork
                                                    .Amenities
                                                    .Find(utilityId);
                if (utility is null)
                {
                    throw new AmenityNotFoundException(utilityId);
                }
                accommodation.Amenities.Add(utility);
            }

            await _unitOfWork.Accommodations.Add(accommodation);

            accommodation.Images = new List<AccommodationImage>();
            AccommodationImage thumbnailImage = new AccommodationImage()
            {
                ImageURL = newAccommodationDTO.ThumbnailImage is null ?
                                        _settings.Value.DefaultImagePath :
                                        await ImageHelper.SaveImage(newAccommodationDTO.ThumbnailImage,
                                                                    accommodation.Id,
                                                                    _hostEnvironment.ContentRootPath)
            };

            accommodation.ThumbnailImage = thumbnailImage;
            await _unitOfWork.Save();

            return _mapper.Map<DisplayAccommodationDTO>(accommodation);
        }

        public async Task<DisplayAccommodationDTO> UpdateBasicAccommodationInformation(Guid id, UpdateBasicAccommodationInformationDTO updatePropertyDTO, string username)
        {
            ValidateUpdateProperty(updatePropertyDTO);

            Accommodation property = await _unitOfWork
                                            .Accommodations
                                            .Find(id);
            if (property is null)
            {
                throw new AccommodationNotFoundException(id);
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
                throw new InvalidUserInAccommodationException();
            }

            property.Name = updatePropertyDTO.Name.Trim();
            property.Description = updatePropertyDTO.Description.Trim();

            await _unitOfWork.Save();

            return _mapper.Map<DisplayAccommodationDTO>(property);
        }

        public async Task DeleteAccommodation(Guid id, string username)
        {
            Accommodation property = await _unitOfWork
                                            .Accommodations
                                            .Find(id);
            if (property == null)
            {
                throw new AccommodationNotFoundException(id);
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
                throw new InvalidUserInAccommodationException();
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
                throw new InvalidAccommodationNameException(name);
            }
        }

        private static void ValidateDescription(string description)
        {
            if (String.IsNullOrWhiteSpace(description))
            {
                throw new InvalidAccommodationDescriptionException(description);
            }
        }
    }
}
