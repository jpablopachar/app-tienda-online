using Microsoft.AspNetCore.Identity;

namespace Core.Entities
{
    public class User : IdentityUser
    {
        public string? Name { get; set; }
        public string? LastName { get; set; }
        public Address? Address { get; set; }
        public string? Image { get; set; }
    }
}