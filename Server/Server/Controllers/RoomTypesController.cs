using Contracts.RoomTypeDTOs;
using Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Web.API.Controllers
{
    [Route("api/roomTypes")]
    [ApiController]
    public class RoomTypesController : ControllerBase
    {
        private readonly IRoomTypeService _roomTypeService;
        
        public RoomTypesController(IRoomTypeService roomTypeService) 
        {
            _roomTypeService = roomTypeService;
        }

        [HttpPost]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> Post([FromBody] NewRoomTypeDTO newRoomTypeDTO)
        {
            DisplayRoomTypeDTO displayRoomTypeDTO = await _roomTypeService.CreateRoomType(newRoomTypeDTO);
            return CreatedAtAction(nameof(Post), new {id = displayRoomTypeDTO.Id}, displayRoomTypeDTO);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> Put([FromBody] UpdateRoomTypeDTO updateRoomTypeDTO)
        {

        }
    }
}
