using Contracts.AccommodationDTOs;
using Contracts.Common;
using Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.API.Controllers
{
    [Route("api/accommodations")]
    [ApiController]
    public class AccommodationsController : ControllerBase
    {
        private readonly IAccommodationService _accommodationService;

        public AccommodationsController(IAccommodationService accommodationService)
        {
            _accommodationService = accommodationService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAcccommodations([FromQuery] SearchParamsDTO searchParamsDTO)
        {
            PagedListDTO<DisplayAccommodationDTO> pagedAccommodations = await _accommodationService.GetAccommodations(searchParamsDTO, User.Identity.Name);
            return Ok(pagedAccommodations);
        }

        [HttpGet("highest-rated")]
        [AllowAnonymous]
        public async Task<IActionResult> GetHighestRatedAccommodations()
        {
            List<AccommodationPreviewDTO> accommodationPreviewDTOs = await _accommodationService.GetHighestRatedAccommodations();
            return Ok(accommodationPreviewDTOs);
        }

        [HttpGet("user/{id}")]
        [Authorize(Roles = "owner")]
        public async Task<IActionResult> GetUserAccommodations(Guid id)
        {
            List<DisplayAccommodationDTO> displayAccommodationDTOs = await _accommodationService.GetUserAccommodations(id);
            return Ok(displayAccommodationDTOs);
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetDetailedAccommodation(Guid id)
        {
            DetailedAccommodationDTO detailedAccommodationDTO = await _accommodationService.GetById(id);
            return Ok(detailedAccommodationDTO);
        }

        [HttpPost]
        [Authorize(Roles = "owner")]
        public async Task<IActionResult> CreateAccommodation([FromForm] NewAccommodationDTO newAccommodationDTO)
        {
            DisplayAccommodationDTO displayAccommodationDTO = await _accommodationService.CreateAccommodation(newAccommodationDTO, User.Identity.Name);
            return CreatedAtAction(nameof(GetAcccommodations), new { id = displayAccommodationDTO.Id }, displayAccommodationDTO);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "owner")]
        public async Task<IActionResult> UpdateAccommodation(Guid id, [FromBody] UpdateBasicAccommodationInformationDTO updateAccommodationDTO)
        {
            DisplayAccommodationDTO displayAccommodationDTO = await _accommodationService
                                                                        .UpdateBasicAccommodationInformation(id,
                                                                                                             updateAccommodationDTO,
                                                                                                             User.Identity.Name);
            return Ok(displayAccommodationDTO);
        }

        [HttpPost("{id}/add-image")]
        [Authorize(Roles = "owner")]
        public async Task<IActionResult> AddAccommodationImage(Guid id, [FromForm] AddAccommodationImageDTO addPropertyImageDTO)
        {
            DetailedAccommodationDTO detailedAccommodationDTO = await _accommodationService
                                                                        .AddAccommodationImage(id,
                                                                                               addPropertyImageDTO,
                                                                                               User.Identity.Name);
            return Ok(detailedAccommodationDTO);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "owner")]
        public async Task<IActionResult> DeleteAccommodation(Guid id)
        {
            await _accommodationService.DeleteAccommodation(id, User.Identity.Name);
            return NoContent();
        }

        [HttpPut("{id}/toggle-favorite")]
        [Authorize]
        public async Task<IActionResult> ToggleFavorite(Guid id)
        {
            await _accommodationService.ToggleAccommodationFavoriteStatus(id, User.Identity.Name);
            return NoContent();
        }
    }
}
