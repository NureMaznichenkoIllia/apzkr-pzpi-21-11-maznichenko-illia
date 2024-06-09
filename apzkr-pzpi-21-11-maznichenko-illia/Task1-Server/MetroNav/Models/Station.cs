using System.Collections.Generic;

namespace MetroNav.Models
{
    public class Station
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int LocationLeftX { get; set; }
        public int LocationLeftY { get; set; }
        public int LocationRightX { get; set; }
        public int LocationRightY { get; set; }
        public int LineId { get; set; }
        public Line Line { get; set; }
        public List<Platform> Platforms { get; set; }
    }
}
