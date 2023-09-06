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

        [HttpGet("accommodation/{id}")]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> GetRoomTypesForAccommodation(Guid id)
        {
            List<DisplayRoomTypeDTO> displayRoomTypeDTOs = await _roomTypeService.GetRoomTypesForAccommodation(id, User.Identity.Name);
            return Ok(displayRoomTypeDTOs);
        }

        [HttpPost]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> CreateRoomType([FromBody] NewRoomTypeDTO newRoomTypeDTO)
        {
            DisplayRoomTypeDTO displayRoomTypeDTO = await _roomTypeService.CreateRoomType(newRoomTypeDTO, User.Identity.Name);
            return CreatedAtAction(nameof(GetRoomTypesForAccommodation), new {id = displayRoomTypeDTO.Id}, displayRoomTypeDTO);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> UpdateRoomType(Guid id, [FromBody] UpdateRoomTypeDTO updateRoomTypeDTO)
        {
            DisplayRoomTypeDTO displayRoomTypeDTO = await _roomTypeService.UpdateRoomType(id, updateRoomTypeDTO, User.Identity.Name);
            return Ok(displayRoomTypeDTO);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "propertyowner")]
        public async Task<IActionResult> DeleteRoomType(Guid id)
        {
            await _roomTypeService.DeleteRoomType(id, User.Identity.Name);
            return NoContent();
        }
    }
}
