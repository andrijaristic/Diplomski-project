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

        [HttpPost]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> Post([FromBody] NewRoomDTO newRoomDTO)
        {
            DisplayRoomDTO displayRoomDTO = await _roomService.CreateRoom(newRoomDTO);
            return CreatedAtAction(nameof(Post), new { id = displayRoomDTO.Id }, displayRoomDTO);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> Put(Guid id, [FromBody] UpdateRoomDTO updateRoomDTO)
        {
            DisplayRoomDTO displayRoomDTO = await _roomService.UpdateRoom(id, updateRoomDTO, User.Identity.Name);
            return Ok(displayRoomDTO);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> Delete(Guid id)
        {
            await _roomService.DeleteRoom(id, User.Identity.Name);
            return NoContent();
        }
    }
}
