using Contracts.RoomDTOs;
using Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.API.Controllers
{
    [Route("api/rooms")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomService _roomService;
        public RoomsController(IRoomService roomService)
        {
            _roomService = roomService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetFilteredRooms([FromQuery] SearchRoomDTO searchRoomDTO)
        {
            List<DisplayRoomBookingDTO> displayRoomBookingDTOs = await _roomService.FilterRoomsForBooking(searchRoomDTO);
            return Ok(displayRoomBookingDTOs);
        }

        [HttpGet("accommodation/{id}")]
        [Authorize(Roles = "owner")]
        public async Task<IActionResult> GetRoomsForAccommodation(Guid id)
        {
            List<DisplayRoomDTO> displayRoomDTOs = await _roomService.GetRoomsForAccommodation(id, User.Identity.Name);
            return Ok(displayRoomDTOs);
        }

        [HttpPost]
        [Authorize(Roles = "owner")]
        public async Task<IActionResult> CreateRoom([FromBody] NewRoomDTO newRoomDTO)
        {
            DisplayRoomDTO displayRoomDTO = await _roomService.CreateRoom(newRoomDTO, User.Identity.Name);
            return CreatedAtAction(nameof(GetFilteredRooms), new { id = displayRoomDTO.Id }, displayRoomDTO);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "owner")]
        public async Task<IActionResult> UpdateRoomInformation(Guid id, [FromBody] UpdateRoomDTO updateRoomDTO)
        {
            DisplayRoomDTO displayRoomDTO = await _roomService.UpdateRoom(id, updateRoomDTO, User.Identity.Name);
            return Ok(displayRoomDTO);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "owner")]
        public async Task<IActionResult> DeleteRoom(Guid id, [FromBody] DeleteRoomDTO deleteRoomDTO)
        {
            await _roomService.DeleteRoom(id, deleteRoomDTO, User.Identity.Name);
            return NoContent();
        }
    }
}
