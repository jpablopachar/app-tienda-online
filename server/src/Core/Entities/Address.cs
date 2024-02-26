namespace Core.Entities
{
    public class Address : Base
    {
        public string? Street { get; set; }
        public string? City { get; set; }
        public string? Department { get; set; }
        public string? PostalCode { get; set; }
        public string? Country { get; set; }
        public string? UserId { get; set; }
        public User? User { get; set; }
    }
}