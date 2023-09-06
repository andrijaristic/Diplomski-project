using AutoMapper;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Services;
using Domain.Interfaces.Utilities;
using Domain.Interfaces.Utilities.DataInitializers;
using Domain.Models.AppSettings;
using Infrastructure;
using Infrastructure.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Service;
using Service.Mapping;
using Service.Utilities;
using Service.Utilities.DataInitializers;
using Stripe;
using System.Text;
using Web.API.Middleware;

string _cors = "cors";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "BookingAPI",
        Description = "Booking service API",
        Version = "v1"
    });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "Enter JWT Token",
        Scheme = "bearer",
        Type = SecuritySchemeType.Http,
        In = ParameterLocation.Header,
        BearerFormat = "JWT"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
            },
            new string[]{}
        }
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: _cors, builder =>
    {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .SetIsOriginAllowed(origin => true)
               .AllowCredentials();
    });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AppSettings")["SecretKey"]));
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = "https://localhost:7221",
        IssuerSigningKey = key
    };
});

builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
builder.Services.AddOptions();

builder.Services.AddTransient<ExceptionHandlingMiddleware>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IPropertyService, PropertyService>();
builder.Services.AddScoped<IRoomService, RoomService>();
builder.Services.AddScoped<IRoomTypeService, RoomTypeService>();
builder.Services.AddScoped<IReservationsService, ReservationService>();
builder.Services.AddScoped<ICommentsService, CommentService>();
builder.Services.AddScoped<IAmenityService, AmenityService>();

builder.Services.AddScoped<IAuthUtility, AuthUtility>();
builder.Services.AddScoped<IEmailUtility, EmailUtility>();
builder.Services.AddScoped<IUserDataInitializer, UserDataInitializer>();
builder.Services.AddScoped<IUtilityDataInitializer, UtilityDataInitializer>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPropertyRepository, PropertyRepository>();
builder.Services.AddScoped<IReservationRepository, ReservationRepository>();
builder.Services.AddScoped<IRoomRepository, RoomRepository>();
builder.Services.AddScoped<IRoomTypeRepository, RoomTypeRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<IAmenityRepository, AmenityRepository>();
builder.Services.AddScoped<IReservedDaysRepository, ReservedDaysRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddDbContext<ProjectDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("BookingDatabase"),
        b => b.MigrationsAssembly("Web.API"))
    );

builder.Services.AddSingleton(new MapperConfiguration(mc =>
{
    mc.AddProfile(new UserMappingProfile());
    mc.AddProfile(new PropertyMappingProfile());
    mc.AddProfile(new RoomMappingProfile());
    mc.AddProfile(new RoomTypeMappingProfile());
    mc.AddProfile(new ReservationMappingProfile());
    mc.AddProfile(new CommentMappingProfile());
    mc.AddProfile(new SeasonalPricingMappingProfile());
    mc.AddProfile(new AccommodationImageMappingProfile(builder.Configuration.GetSection("AppSettings")["DefaultImagePath"]));
    mc.AddProfile(new PropertyUtilityMappingProfile());
}).CreateMapper());

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    // apply new migrations on startup
    var context = scope.ServiceProvider.GetRequiredService<ProjectDbContext>();
    context.Database.EnsureCreated();

    scope.ServiceProvider.GetRequiredService<IUserDataInitializer>().InitializeData();
    scope.ServiceProvider.GetRequiredService<IUtilityDataInitializer>().InitializeData();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "..", "Infrastructure", "Images")),
    RequestPath = "/Images"
});

app.UseHttpsRedirection();

app.UseRouting();

StripeConfiguration.ApiKey = builder.Configuration.GetSection("AppSettings")["StripeSecretKey"];

app.UseCors(_cors);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();