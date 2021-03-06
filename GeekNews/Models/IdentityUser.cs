﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace GeekNews.Models
{
    public class User : IdentityUser
    {
        public User()
        {
            UserLikes = new HashSet<UserLikes>();
        }
        public virtual ICollection<UserLikes> UserLikes { get; set; }
    }
}
