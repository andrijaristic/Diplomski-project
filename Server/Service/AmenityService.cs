using AutoMapper;
using Domain.Models;
using Contracts.AmenityDTOs;
using Domain.Interfaces.Services;
using Domain.Interfaces.Repositories;

namespace Service
{
    public class AmenityService : IAmenityService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public AmenityService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<List<DisplayAmenityDTO>> GetAll()
        {
           IEnumerable<PropertyUtility> amenities = await _unitOfWork
                                                                .PropertyUtilities
                                                                .GetAll();

            return _mapper.Map<List<DisplayAmenityDTO>>(amenities);
        }
    }
}
