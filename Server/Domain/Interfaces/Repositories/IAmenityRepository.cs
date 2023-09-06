﻿using Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Interfaces.Repositories
{
    public interface IAmenityRepository : IGenericRepository<PropertyUtility>
    {
        Task<List<PropertyUtility>> GetAccommodationAmenities(Guid accommodationId);
    }
}