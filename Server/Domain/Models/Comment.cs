﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Comment
    {
        public Guid Id { get; set; }    
        public Guid UserId { get; set; }    
        public User User { get; set; }
        public Guid PropertyId { get; set; }    
        public Property Property { get; set; }
        public string Header { get; set; }  
        public string Content { get; set; } 
        public double Grade { get; set; }
    }
}