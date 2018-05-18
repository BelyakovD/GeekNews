using System;
using System.Collections.Generic;

namespace GeekNews.Models
{
    public partial class Section
    {
        public Section()
        {
            News = new HashSet<News>();
        }

        public int SectionId { get; set; }
        public string Url { get; set; }

        public ICollection<News> News { get; set; }
    }
}
