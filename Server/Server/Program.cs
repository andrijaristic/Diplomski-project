using System.Text;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Stripe;
using AutoMapper;
using Domain.Models.AppSettings;
using Domain.Interfaces.Services;
using Domain.Interfaces.Utilities;
using Domain.Interfaces.Repositories;
using Domain.Interfaces.Utilities.DataInitializers;
using Infrastructure;
using Infrastructure.Repositories;
using Service;
using Service.Mapping;
using Service.Utilities;
using Service.Utilities.DataInitializers;
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
builder.Services.AddScoped<IAccommodationService, AccommodationService>();
builder.Services.AddScoped<IRoomService, RoomService>();
builder.Services.AddScoped<IRoomTypeService, RoomTypeService>();
builder.Services.AddScoped<IReservationsService, ReservationService>();
builder.Services.AddScoped<ICommentsService, CommentService>();
builder.Services.AddScoped<IAmenityService, AmenityService>();

builder.Services.AddScoped<IAuthUtility, AuthUtility>();
builder.Services.AddScoped<IEmailUtility, EmailUtility>();
builder.Services.AddScoped<IUserDataInitializer, UserDataInitializer>();
builder.Services.AddScoped<IAmenityDataInitializer, UtilityDataInitializer>();
builder.Services.AddScoped<IAccommodationDataInitializer, AccommodationDataInitializer>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAccommodationRepository, AccommodationRepository>();
builder.Services.AddScoped<IReservationRepository, ReservationRepository>();
builder.Services.AddScoped<IRoomRepository, RoomRepository>();
builder.Services.AddScoped<IRoomTypeRepository, RoomTypeRepository>();
builder.Services.AddScoped<ICommentRepository, CommentRepository>();
builder.Services.AddScoped<IAmenityRepository, AmenityRepository>();
builder.Services.AddScoped<IReservedDaysRepository, ReservedDaysRepository>();
builder.Services.AddScoped<IAccommodationImageRepository, AccommodationImageRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddDbContext<ProjectDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("AccommodationProviderDb"),
        b => b.MigrationsAssembly("Web.API"))
    );

builder.Services.AddSingleton(new MapperConfiguration(mc =>
{
    mc.AddProfile(new UserMappingProfile());
    mc.AddProfile(new AccommodationMappingProfile());
    mc.AddProfile(new RoomMappingProfile());
    mc.AddProfile(new RoomTypeMappingProfile());
    mc.AddProfile(new ReservationMappingProfile());
    mc.AddProfile(new CommentMappingProfile());
    mc.AddProfile(new SeasonalPricingMappingProfile());
    mc.AddProfile(new AccommodationImageMappingProfile(builder.Configuration.GetSection("AppSettings")["DefaultImagePath"]));
    mc.AddProfile(new AmenityMappingProfile());
}).CreateMapper());

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    // apply new migrations on startup
    var context = scope.ServiceProvider.GetRequiredService<ProjectDbContext>();
    context.Database.EnsureCreated();

    scope.ServiceProvider.GetRequiredService<IUserDataInitializer>().InitializeData();
    scope.ServiceProvider.GetRequiredService<IAmenityDataInitializer>().InitializeData();
    scope.ServiceProvider.GetRequiredService<IAccommodationDataInitializer>().InitializeData();
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
    FileProvider = new PhysicalFileProvider(Path.Combine(app.Environment.ContentRootPath, "Infrastructure", "Images")),
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