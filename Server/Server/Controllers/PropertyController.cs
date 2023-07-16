using Contracts.PropertyDTOs;
using Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.CodeAnalysis;

namespace Web.API.Controllers
{
    [Route("api/property")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyService _propertyService;

        public PropertyController(IPropertyService propertyService) 
        {
            _propertyService = propertyService;
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> Get(Guid id)
        {
            DisplayPropertyDTO displayPropertyDTO = await _propertyService.GetById(id);
            return Ok(displayPropertyDTO);
        }

        [HttpPost]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> Post([FromBody] NewPropertyDTO newPropertyDTO)
        {
            DisplayPropertyDTO displayPropertyDTO = await _propertyService.CreateProperty(newPropertyDTO, User.Identity.Name);
            return CreatedAtAction(nameof(Get), new { id = displayPropertyDTO.Id }, displayPropertyDTO);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> Put(Guid id, [FromBody] UpdatePropertyDTO updatePropertyDTO)
        {
            DisplayPropertyDTO displayPropertyDTO = await _propertyService.UpdateProperty(id, updatePropertyDTO, User.Identity.Name);
            return Ok(displayPropertyDTO);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _propertyService.DeleteProperty(id, User.Identity.Name);
            return NoContent();
        }
    }
}
