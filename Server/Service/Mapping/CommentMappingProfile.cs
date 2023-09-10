using AutoMapper;
using Contracts.CommentDTOs;
using Domain.Models;

namespace Service.Mapping
{
    public class CommentMappingProfile : Profile
    {
        public CommentMappingProfile()
        {
            CreateMap<Comment, DisplayCommentDTO>().ReverseMap();
            CreateMap<Comment, NewCommentDTO>().ReverseMap();
        }
    }
}
