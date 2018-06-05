using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GeekNews.Models
{
    public class UserLikes
    {        
        public int ID { get; set; }
        
        public string UserId { get; set; }

        public int NewsId { get; set; }

        public virtual User AspNetUsers { get; set; }

        public virtual News News { get; set; }
    }
}
