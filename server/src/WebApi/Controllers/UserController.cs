using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebApi.Dtos;
using WebApi.Errors;
using WebApi.Extensions;

namespace WebApi.Controllers
{
    public class UserController : ApiController
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IGenericAuthRepository<User> _authRepository;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserController(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService, IMapper mapper, IPasswordHasher<User> passwordHasher, IGenericAuthRepository<User> authRepository, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
            _authRepository = authRepository;
            _roleManager = roleManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email!);

            if (user == null) return Unauthorized(new CodeErrorResponse(401));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password!, false);

            if (!result.Succeeded) return Unauthorized(new CodeErrorResponse(401));

            var roles = await _userManager.GetRolesAsync(user);

            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user, roles),
                Name = user.Name,
                LastName = user.LastName,
                Image = user.Image,
                Admin = roles.Contains("ADMIN") ? true : false
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var user = new User
            {
                Name = registerDto.Name,
                LastName = registerDto.LastName,
                Email = registerDto.Email,
                UserName = registerDto.Username
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password!);

            if (!result.Succeeded) return BadRequest(new CodeErrorResponse(400));

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                LastName = user.LastName,
                Token = _tokenService.CreateToken(user, null),
                Email = user.Email,
                Username = user.UserName,
                Admin = false
            };
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("account/{id}")]
        public async Task<ActionResult<UserDto>> GetUserById(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null) return NotFound(new CodeErrorResponse(404, "El usuario no existe"));

            var roles = await _userManager.GetRolesAsync(user);

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                LastName = user.LastName,
                Email = user.Email,
                Username = user.UserName,
                Image = user.Image,
                Admin = roles.Contains("ADMIN") ? true : false
            };
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetUser()
        {
            var user = await _userManager.FindUserAsync(HttpContext.User);

            var roles = await _userManager.GetRolesAsync(user!);

            return new UserDto
            {
                Id = user!.Id,
                Name = user.Name,
                LastName = user.LastName,
                Email = user.Email,
                Username = user.UserName,
                Image = user.Image,
                Token = _tokenService.CreateToken(user, roles),
                Admin = roles.Contains("ADMIN") ? true : false
            };
        }

        [HttpGet("validEmail")]
        public async Task<ActionResult<bool>> ValidateEmail([FromQuery] string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            return user == null ? false : true;
        }

        [Authorize]
        [HttpGet("address")]
        public async Task<ActionResult<AddressDto>> GetAddress()
        {
            var user = await _userManager.FindUserWithAddressAsync(HttpContext.User);

            return _mapper.Map<Address, AddressDto>(user!.Address!);
        }

        [Authorize]
        [HttpPut("address")]
        public async Task<ActionResult<AddressDto>> UpdateAddress(AddressDto address)
        {
            var user = await _userManager.FindUserWithAddressAsync(HttpContext.User);

            user!.Address = _mapper.Map<AddressDto, Address>(address);

            var result = await _userManager.UpdateAsync(user);

            if (result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));

            return BadRequest("No se puede actualizar la dirección del usuario");
        }

        [Authorize]
        [HttpPut("update/{id}")]
        public async Task<ActionResult<UserDto>> UpdateUser(string id, RegisterDto registerDto)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null) return NotFound(new CodeErrorResponse(404, "El usuario no existe"));

            user.Name = registerDto.Name;
            user.LastName = registerDto.LastName;
            user.Image = registerDto.Image;

            if (!string.IsNullOrEmpty(registerDto.Password)) user.PasswordHash = _passwordHasher.HashPassword(user, registerDto.Password);

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded) return BadRequest(new CodeErrorResponse(400, "No se pudo actualizar el usuario"));

            var roles = await _userManager.GetRolesAsync(user);

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                LastName = user.LastName,
                Email = user.Email,
                Username = user.UserName,
                Token = _tokenService.CreateToken(user, roles),
                Image = user.Image,
                Admin = roles.Contains("ADMIN") ? true : false
            };
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet("pagination")]
        public async Task<ActionResult<PaginationDto<UserDto>>> GetUsers([FromQuery] UserSpecificationParams userParams)
        {
            var spec = new UserSpecification(userParams);
            var users = await _authRepository.GetAllWithSpec(spec);

            var specCount = new UserForCountingSpecification(userParams);
            var totalUsers = await _authRepository.CountAsync(specCount);

            var rounded = Math.Ceiling(Convert.ToDecimal(totalUsers) / Convert.ToDecimal(userParams.PageSize));
            var totalPages = Convert.ToInt32(rounded);

            var data = _mapper.Map<IReadOnlyList<User>, IReadOnlyList<UserDto>>(users);

            return Ok(new PaginationDto<UserDto>
            {
                Count = totalUsers,
                Data = data,
                PageCount = totalPages,
                PageIndex = userParams.PageIndex,
                PageSize = userParams.PageSize
            });
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPut("role/{id}")]
        public async Task<ActionResult<UserDto>> UpdateRole(string id, RoleDto roleParams)
        {
            var role = await _roleManager.FindByNameAsync(roleParams.Name!);

            if (role == null) return NotFound(new CodeErrorResponse(404, "El rol no existe"));

            var user = await _userManager.FindByIdAsync(id);

            if (user == null) return NotFound(new CodeErrorResponse(404, "El usuario no existe"));

            var userDto = _mapper.Map<User, UserDto>(user);

            if (roleParams.Status)
            {
                var result = await _userManager.AddToRoleAsync(user, roleParams.Name!);

                if (result.Succeeded) userDto.Admin = true;

                if (result.Errors.Any())
                {
                    if (result.Errors.Where(error => error.Code == "UserAlreadyInRole").Any())
                    {
                        userDto.Admin = true;
                    }
                }
            }
            else
            {
                var result = await _userManager.RemoveFromRoleAsync(user, roleParams.Name!);

                if (result.Succeeded) userDto.Admin = false;
            }

            if (userDto.Admin)
            {
                var roles = new List<string>();

                roles.Add("ADMIN");

                userDto.Token = _tokenService.CreateToken(user, roles);
            }
            else
            {
                userDto.Token = _tokenService.CreateToken(user, null);
            }

            return userDto;
        }
    }
}