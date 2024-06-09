using System;

namespace MetroNav.Models
{
    public class Schedule
    {
        public int Id { get; set; }
        public int PlatformId { get; set; }
        public Platform Platform { get; set; }
        public int TrainId { get; set; }
        public Train Train { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
    }
}
