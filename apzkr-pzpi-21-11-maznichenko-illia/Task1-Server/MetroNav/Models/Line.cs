using System.Collections.Generic;

namespace MetroNav.Models
{
    public class Line
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Station> Stations { get; set; }
    }
}
