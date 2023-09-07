using AutoMapper;
using Contracts.CommentDTOs;
using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
