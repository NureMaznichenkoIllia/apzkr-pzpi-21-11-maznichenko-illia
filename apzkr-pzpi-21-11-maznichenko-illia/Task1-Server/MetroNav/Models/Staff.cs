namespace MetroNav.Models
{
    public class Staff
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Phone { get; set; }
        public int StationId { get; set; }
        public Station Station { get; set; }
    }
}
