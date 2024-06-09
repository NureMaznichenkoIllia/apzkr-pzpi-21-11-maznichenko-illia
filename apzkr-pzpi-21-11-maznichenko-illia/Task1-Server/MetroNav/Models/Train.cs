using System.Collections.Generic;

namespace MetroNav.Models
{
    public class Train
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }
        public int Capacity { get; set; }
        public int CurrentLocationX { get; set; }
        public int CurrentLocationY { get; set; }
        public List<Schedule> Schedules { get; set; }
    }
}
