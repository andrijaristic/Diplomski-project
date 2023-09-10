using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class User
    {
        public Guid Id { get; set; }    
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Country { get; set; }
        public string PhoneNumber { get; set; } 
        public UserType Role { get;set; }
        public VerificationStatus VerificationStatus { get; set; } = VerificationStatus.PENDING;
        public bool IsVerified { get; set; } = false;
        public List<Comment> Comments { get; set; }
        public List<Accommodation> Properties { get; set; }
        public List<SavedProperty> SavedProperties { get; set; }   
        public List<Reservation> Reservations { get; set; } 
    }
}
