using AutoMapper;
using Contracts.CommentDTOs;
using Domain.Exceptions.CommentExceptions;
using Domain.Exceptions.AccommodationExceptions;
using Domain.Exceptions.UserExceptions;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Domain.Models;

namespace Service
{
    public class CommentService : ICommentsService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CommentService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<DisplayCommentDTO> CreateComment(NewCommentDTO newCommentDTO, string username)
        {
            ValidateNewComment(newCommentDTO);

            User user = await _unitOfWork
                                    .Users
                                    .FindByUsername(username);
            if (user is null)
            {
                throw new UserNotFoundException(username);
            }

            Accommodation property = await _unitOfWork
                                                .Accommodations
                                                .Find(newCommentDTO.AccommodationId);
            if (property is null)
            {
                throw new AccommodationNotFoundException(newCommentDTO.AccommodationId);
            }

            Reservation reservation = await _unitOfWork
                                                    .Reservations
                                                    .FindForUserInAccommodation(user.Id,
                                                                                property.Id,
                                                                                DateTime.Now.ToUniversalTime());
            if (reservation is null)
            {
                throw new InvalidCommentPermissions();
            }

            bool commentExists = await _unitOfWork
                                            .Comments
                                            .CheckIfCommentByUserForAccommodationExists(property.Id, user.Id);
            if (commentExists)
            {
                throw new UserCommentExistsException();
            }

            Comment comment = _mapper.Map<Comment>(newCommentDTO);
            comment.UserId = user.Id;
            comment.UserFullName = $"{user.FirstName} {user.LastName}";
            comment.CreationDate = DateTime.Now.ToUniversalTime();

            await _unitOfWork.Comments.Add(comment);

            int count = 1;
            double totalGrade = comment.Grade;
            foreach (Comment _comment in property.Comments)
            {
                totalGrade += _comment.Grade;
                ++count;
            }

            property.AverageGrade = totalGrade / count;

            await _unitOfWork.Save();

            return _mapper.Map<DisplayCommentDTO>(comment);
        }

        public async Task<List<DisplayCommentDTO>> GetAccommodationComments(Guid accommodationId)
        {
            List<Comment> comments = await _unitOfWork
                                                .Comments
                                                .GetAccommodationComments(accommodationId);
            return _mapper.Map<List<DisplayCommentDTO>>(comments);
        }

        public async Task<List<DisplayCommentDTO>> GetUserComments(Guid userId)
        {
            List<Comment> comments = await _unitOfWork
                                                .Comments
                                                .GetUserComments(userId);
            List<DisplayCommentDTO> displayCommentDTOs = _mapper.Map<List<DisplayCommentDTO>>(comments);

            foreach (var displayCommentDTO in displayCommentDTOs)
            {
                Accommodation property = await _unitOfWork
                                                    .Accommodations
                                                    .Find(displayCommentDTO.PropertyId);
                if (property is null)
                {
                    throw new AccommodationNotFoundException(displayCommentDTO.PropertyId);
                }

                displayCommentDTO.PropertyName = property.Name;
            }

            return displayCommentDTOs;
        }

        // Validations
        public static void ValidateNewComment(NewCommentDTO newCommentDTO)
        {
            ValidateHeader(newCommentDTO.Header);
            ValidateContent(newCommentDTO.Content);
            ValidateGrade(newCommentDTO.Grade);
        }

        public static void ValidateHeader(string header)
        {
            if (String.IsNullOrEmpty(header))
            {
                throw new InvalidCommentHeaderException();
            }
        }

        public static void ValidateContent(string content)
        {
            if (String.IsNullOrEmpty(content))
            {
                throw new InvalidCommentContentException();
            }
        }

        public static void ValidateGrade(double grade)
        {
            if (grade < 0 || grade > 5)
            {
                throw new InvalidCommentGradeException();
            }
        }
    }
}
