using Contracts.Common;
using Contracts.PropertyDTOs;
using Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.CodeAnalysis;

namespace Web.API.Controllers
{
    [Route("api/properties")]
    [ApiController]
    public class PropertiesController : ControllerBase
    {
        private readonly IPropertyService _propertyService;

        public PropertiesController(IPropertyService propertyService)
        {
            _propertyService = propertyService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAcccommodations([FromQuery] SearchParamsDTO searchParamsDTO)
        {
            PagedListDTO<DisplayPropertyDTO> pagedAccommodations = await _propertyService.GetAccommodations(searchParamsDTO);
            return Ok(pagedAccommodations);
        }

        [HttpGet("highest-rated")]
        [AllowAnonymous]
        public async Task<IActionResult> GetHighestRatedAccommodations()
        {
            List<PropertyPreviewDTO> propertyPreviewDTOs = await _propertyService.GetHighestRatedAccommodations();
            return Ok(propertyPreviewDTOs);
        }

        [HttpGet("user/{id}")]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> GetUserAccommodations(Guid id)
        {
            List<DisplayPropertyDTO> displayPropertyDTOs = await _propertyService.GetUserAccommodations(id);
            return Ok(displayPropertyDTOs);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDetailedAccommodation(Guid id)
        {
            DetailedPropertyDTO detailedPropertyDTO = await _propertyService.GetById(id);
            return Ok(detailedPropertyDTO);
        }

        [HttpPost]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> CreateAccommodation([FromForm] NewPropertyDTO newPropertyDTO)
        {
            DisplayPropertyDTO displayPropertyDTO = await _propertyService.CreateProperty(newPropertyDTO, User.Identity.Name);
            return CreatedAtAction(nameof(GetAcccommodations), new { id = displayPropertyDTO.Id }, displayPropertyDTO);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> UpdateAccommodation(Guid id, [FromBody] UpdateBasicPropertyInformationDTO updatePropertyDTO)
        {
            DisplayPropertyDTO displayPropertyDTO = await _propertyService.UpdateBasicPropertyInformation(id, updatePropertyDTO, User.Identity.Name);
            return Ok(displayPropertyDTO);
        }

        [HttpPost("{id}/add-image")]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> AddPropertyImage(Guid id, [FromForm] AddPropertyImageDTO addPropertyImageDTO)
        {
            DetailedPropertyDTO detailedPropertyDTO = await _propertyService.AddPropertyImage(id, addPropertyImageDTO, User.Identity.Name);
            return Ok(detailedPropertyDTO);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> DeleteAccommodation(Guid id)
        {
            await _propertyService.DeleteProperty(id, User.Identity.Name);
            return NoContent();
        }

        //[HttpPut("{id}/verify")]
        //[Authorize(Roles = "admin")]
        //public async Task<IActionResult> VerifyAccommodation(Guid id, [FromBody] VerifyPropertyDTO verifyPropertyDTO)
        //{
        //    DisplayPropertyDTO displayPropertyDTO = await _propertyService.VerifyProperty(id, verifyPropertyDTO.IsAccepted);
        //    return Ok(displayPropertyDTO);
        //}
    }
}
