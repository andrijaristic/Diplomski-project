﻿using Contracts.RoomDTOs;
using Domain.Interfaces.Repositories;
using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class RoomRepository : GenericRepository<Room>, IRoomRepository
    {
        public RoomRepository(ProjectDbContext _dbContext) : base(_dbContext)
        {

        }

        public Task<List<Room>> FilterRooms(SearchRoomDTO searchRoomDTO)
        {
            var source = _dbContext
                            .Rooms
                            .Where(r => r.AccommodationId == searchRoomDTO.AccommodationId)
                            .Include(r => r.OccupiedDates)
                            .Include(r => r.RoomType)
                            .ThenInclude(rt => rt.SeasonalPricing)
                            .AsQueryable();

            var src = source.ToList();

            // startDate1 - searchDTO Arrival
            // endDate1 - searchDTO Departure
            // startDate2 - x.Arrival
            // endDate2 - x.Departure

            // Will accept anything where an overlap DOESN'T happen
            // This finds where overlaps happen but negates that so TRUE becomes FALSE
            source = source
                        .Where(x => (x.OccupiedDates
                        .Any(x => searchRoomDTO.ArrivalDate > x.DepartureDate &&
                                    x.ArrivalDate < searchRoomDTO.DepartureDate)) ||
                        (x.OccupiedDates.Count == 0));

            var src2 = source.ToList();


            source = source
                        .Where(x => x.RoomType.Adults >= searchRoomDTO.Adults &&
                                    x.RoomType.Children >= searchRoomDTO.Children);

            var src3 = source.ToList();


            return source.ToListAsync();
        }

        public async Task<Room> FindByIdAndAccommodation(Guid roomId, Guid propertyId)
        {
            Room room = await _dbContext
                                    .Rooms
                                    .Where(r => r.Id == roomId && r.AccommodationId == propertyId)
                                    .Include(r => r.OccupiedDates)
                                    .Include(r => r.RoomType)
                                    .ThenInclude(rt => rt.SeasonalPricing)
                                    .FirstOrDefaultAsync();
            return room;
        }

        public async Task<Room> FindDetailedRoom(Guid id, Guid propertyId, DateTime date)
        {
            Room room = await _dbContext
                                    .Rooms
                                    .Where(r => r.Id == id &&
                                                r.AccommodationId == propertyId)
                                    .Include(r => r.Reservations
                                    .Where(rs => rs.DepartureDate.Date >= date))
                                    .Include(r => r.RoomType)
                                    .Include(r => r.Accommodation)
                                    .FirstOrDefaultAsync();
            return room;
        }

        public async Task<List<Room>> GetForAccommodation(Guid accommodationId, DateTime date)
        {
            List<Room> rooms = await _dbContext
                                            .Rooms
                                            .Where(r => !r.IsDeleted &&
                                                         r.AccommodationId == accommodationId)
                                            .Include(r => r.RoomType)
                                            .ThenInclude(rt => rt.SeasonalPricing)
                                            .Include(r => r.Reservations
                                            .Where(rs => rs.DepartureDate.Date >= date))
                                            .ToListAsync();
            return rooms;
        }
    }
}
