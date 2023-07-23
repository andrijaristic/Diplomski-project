using Contracts.ReservationDTOs;
using Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.API.Controllers
{
    [Route("api/reservations")]
    [ApiController]
    public class ReservationsController : ControllerBase
    {
        private readonly IReservationsService _reservationsService;
        public ReservationsController(IReservationsService reservationsService)
        {
            _reservationsService = reservationsService;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Post([FromBody] NewReservationDTO newReservationDTO)
        {
            DisplayReservationDTO displayReservationDTO = await _reservationsService.CreateReservation(newReservationDTO);
            return CreatedAtAction(nameof(Post), new { id = displayReservationDTO.Id }, displayReservationDTO);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> CancelReservation(Guid id)
        {
            DisplayReservationDTO displayReservationDTO = await _reservationsService.CancelReservation(id, User.Identity.Name);
            return Ok(displayReservationDTO);
        }
    }
}
