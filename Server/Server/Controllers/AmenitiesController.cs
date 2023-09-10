using Contracts.AmenityDTOs;
using Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.API.Controllers
{
    [Route("api/amenities")]
    [ApiController]
    public class AmenitiesController : ControllerBase
    {
        private readonly IAmenityService _amenityService;
        public AmenitiesController(IAmenityService amenityService)
        {
            _amenityService = amenityService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllAmenities()
        {
            List<AmenityDTO> displayAmenityDTOs = await _amenityService.GetAll();
            return Ok(displayAmenityDTOs);
        }
    }
}
