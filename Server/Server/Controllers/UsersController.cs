using Contracts.UserDTOs;
using Domain.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace Web.API.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> Get(Guid id)
        {
            DisplayUserDTO displayUserDTO = await _userService.GetById(id);
            return Ok(displayUserDTO);
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            AuthDTO authDTO = await _userService.Login(loginDTO);
            return Ok(authDTO);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Post([FromBody] NewUserDTO newUserDTO)
        {
            DisplayUserDTO displayUserDTO = await _userService.CreateUser(newUserDTO);
            return CreatedAtAction(nameof(Get), new { id = displayUserDTO.Id }, displayUserDTO);
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Put([FromBody] UpdateUserDTO updateUserDTO)
        {
            DisplayUserDTO displayUserDTO = await _userService.UpdateUser(updateUserDTO, User.Identity.Name);
            return Ok(displayUserDTO);
        }

        [HttpPut("{id}/change-password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(Guid id, [FromBody] ChangePasswordDTO changePasswordDTO)
        {
            DisplayUserDTO displayUserDTO = await _userService.ChangePassword(id, changePasswordDTO, User.Identity.Name);
            return Ok(displayUserDTO);
        }

        [HttpPut("{id}/verify")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> Verify(Guid id, [FromBody]VerifyUserDTO verifyUserDTO)
        {
            DisplayUserDTO displayUserDTO = await _userService.VerifyUser(id, verifyUserDTO.IsAccepted);
            return Ok(displayUserDTO);
        }
    }
}
