﻿using Domain.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ProjectDbContext _dbContext;
        public IUserRepository Users { get; set; }
        public IPropertyRepository Properties { get; set; }
        public IReservationRepository Reservations { get; set; }
        public IRoomRepository Rooms { get; set; }

        public UnitOfWork(ProjectDbContext dbContext, IUserRepository users, IPropertyRepository properties, IReservationRepository reservations, IRoomRepository rooms)
        {
            _dbContext = dbContext;
            Users = users;
            Properties = properties;
            Reservations = reservations;
            Rooms = rooms;
        }

        public async Task Save()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}