﻿using AutoMapper;
using Contracts.AmenityDTOs;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Domain.Models;

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

        public async Task<List<AmenityDTO>> GetAll()
        {
            IEnumerable<Amenity> amenities = await _unitOfWork
                                                        .Amenities
                                                        .GetAll();

            return _mapper.Map<List<AmenityDTO>>(amenities);
        }
    }
}
