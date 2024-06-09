using System.Collections.Generic;

namespace MetroNav.Models
{
    public class Platform
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public int StationId { get; set; }
        public Station Station { get; set; }
        public List<Schedule> Schedules { get; set; }
    }
}
