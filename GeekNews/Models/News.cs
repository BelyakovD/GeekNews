using System;
using System.Collections.Generic;

namespace GeekNews.Models
{
    public partial class News
    {
        public News()
        {
            UserLikes = new HashSet<UserLikes>();
        }

        public int NewsId { get; set; }
        public int SectionId { get; set; }
        public string Content { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public string Date { get; set; }

        public Section Section { get; set; }
        public virtual ICollection<UserLikes> UserLikes { get; set; } 
    }
}
