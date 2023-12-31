﻿namespace Domain.Models
{
    public class Accommodation
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double AverageGrade { get; set; } = 1;
        public AccommodationImage ThumbnailImage { get; set; }
        public List<AccommodationImage> Images { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public string Country { get; set; }
        public string Area { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Room> Rooms { get; set; }
        public List<RoomType> RoomTypes { get; set; }
        public List<Amenity> Amenities { get; set; }
        public List<Reservation> Reservations { get; set; }
        public List<SavedAccommodation> SavedAccommodations { get; set; }
        public int StartingPrice { get; set; }
        public bool IsVisible { get; set; } = false;
        public bool IsDeleted { get; set; } = false;
    }
}
