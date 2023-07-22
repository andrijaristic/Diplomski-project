using Contracts.RoomDTOs;
using Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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

        [HttpPost]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> Post([FromBody] NewRoomDTO newRoomDTO)
        {
            DisplayRoomDTO displayRoomDTO = await _roomService.CreateRoom(newRoomDTO);
            return CreatedAtAction(nameof(Post), new { id = displayRoomDTO.Id }, displayRoomDTO);
        }
    }
}
