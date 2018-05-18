using System;
using System.Collections.Generic;

namespace GeekNews.Models
{
    public partial class News
    {
        public int NewsId { get; set; }
        public int SectionId { get; set; }
        public string Content { get; set; }
        public string Title { get; set; }

        public Section Section { get; set; }
    }
}
