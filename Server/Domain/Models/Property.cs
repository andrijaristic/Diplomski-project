using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Property
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double AverageGrade { get; set; }
        public Guid UserId { get; set; }    
        public User User { get; set; }  
        public List<Comment> Comments { get; set; }
        public List<Room> Rooms { get; set; }
        public List<RoomType> RoomTypes { get; set; }
        public List<PropertyUtility> Utilities { get; set; }
        public List<Reservation> Reservations { get; set; }
        // EF Core .Include() from SavedProperty table
        public List<SavedProperty> SavedProperties { get; set; }
        public int StartingPrice { get; set; }
    }
}
