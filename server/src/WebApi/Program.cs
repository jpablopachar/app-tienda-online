using System.Text;
using AutoMapper;
using BusinessLogic.Data;
using BusinessLogic.Logic;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApi.Dtos;
using WebApi.Middlewares;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MarketDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("SQLServerConnection")));

builder.Services.AddDbContext<AuthDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("AuthConnection")));

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped(typeof(IGenericAuthRepository<>), typeof(GenericAuthRepository<>));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddScoped<IProductRepository, ProductRepository>();

var builderIdentity = builder.Services.AddIdentityCore<User>();

builderIdentity = new IdentityBuilder(builderIdentity.UserType, builderIdentity.Services);

builderIdentity.AddRoles<IdentityRole>();

builderIdentity.AddEntityFrameworkStores<AuthDbContext>();
builderIdentity.AddSignInManager<SignInManager<User>>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Token:Key"]!)),
        ValidIssuer = builder.Configuration["Token:Issuer"],
        ValidateIssuer = true,
        ValidateAudience = false
    };
});

var mapperConfig = new MapperConfiguration(mc => mc.AddProfile(new MappingProfiles()));

IMapper mapper = mapperConfig.CreateMapper();

builder.Services.AddSingleton(mapper);

// Add services to the container.
// builder.Services.TryAddSingleton<ISystemClock, SystemClock>();

builder.Services.AddTransient<IProductRepository, ProductRepository>();

builder.Services.AddControllers();

builder.Services.AddCors(option => option.AddPolicy("CorsRule", rule => rule.AllowAnyHeader().AllowAnyMethod().WithOrigins("*")));

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseStatusCodePagesWithReExecute("/errors", "?code={0}");

app.UseCors("CorsRule");

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

using (var environment = app.Services.CreateScope())
{
    var services = environment.ServiceProvider;
    var loggerFactory = services.GetRequiredService<ILoggerFactory>();

    try
    {
        var context = services.GetRequiredService<MarketDbContext>();
        var userManager = services.GetRequiredService<UserManager<User>>();
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var identityContext = services.GetRequiredService<AuthDbContext>();

        await context.Database.MigrateAsync();

        await MarketDbContextData.LoadDataAsync(context, loggerFactory);

        await identityContext.Database.MigrateAsync();

        await AuthDbContextData.SeedUserAsync(userManager, roleManager);
    }
    catch (Exception exception)
    {
        var logger = loggerFactory.CreateLogger<MarketDbContextData>();

        logger.LogError(exception.Message);
    }
}

app.Run();
