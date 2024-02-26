using Core.Entities;
using Microsoft.AspNetCore.Identity;

namespace BusinessLogic.Data
{
    public class AuthDbContextData
    {
        public static async Task SeedUserAsync(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new User
                {
                    Name = "Juan",
                    LastName = "Pachar",
                    UserName = "jppachar",
                    Email = "jppachar1993@gmail.com",
                    Address = new Address
                    {
                        Street = "24 de Mayo y Segundo Cueva Celi",
                        City = "Loja",
                        Department = "Loja",
                        PostalCode = "110108"
                    }
                };

                await userManager.CreateAsync(user, "Jppachar1@");
            }

            if (!roleManager.Roles.Any())
            {
                var role = new IdentityRole
                {
                    Name = "ADMIN"
                };

                await roleManager.CreateAsync(role);
            }
        }
    }
}