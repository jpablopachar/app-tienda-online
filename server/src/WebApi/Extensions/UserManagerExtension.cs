using System.Security.Claims;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Extensions
{
    public static class UserManagerExtension
    {
        public static async Task<User?> FindUserWithAddressAsync(this UserManager<User> input, ClaimsPrincipal user)
        {
            var email = user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var currentUser = await input.Users.Include(x => x.Address).SingleOrDefaultAsync(x => x.Email == email);

            return currentUser;
        }

        public static async Task<User?> FindUserAsync(this UserManager<User> input, ClaimsPrincipal user)
        {
            var email = user?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;

            var currentUser = await input.Users.SingleOrDefaultAsync(x => x.Email == email);

            return currentUser;
        }
    }
}