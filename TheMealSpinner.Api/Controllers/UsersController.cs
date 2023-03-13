using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheMealSpinner.Api.Data;
using TheMealSpinner.Api.Models;
using TheMealSpinner.Api.Models.DTOs;
using TheMealSpinner.Api.Repository.IRepository;
using TheMealSpinner.Api.Services;

namespace TheMealSpinner.Api.Controllers
{
    [Route("api/UsersAuthentication")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IRepositories _repositories;
        private readonly IMapper _mapper;

        public UsersController(ApplicationDbContext context, IRepositories repositories, IMapper mapper)
        {
            _repositories = repositories;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest loginRequest)
        {
            var loginResponse = await _repositories.User.Login(loginRequest);
            if (loginResponse.User == null || string.IsNullOrEmpty(loginResponse.Token))
            {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            return loginResponse;

        }
        
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequest registrationRequest)
        {
            if (!_repositories.User.IsUniqueUser(registrationRequest.UserName))
            {
                return BadRequest(new { message = "Please choose a new Username" });
            }

            var user = await _repositories.User.Register(registrationRequest);
            if (user == null)
            {
                return BadRequest(new { message = "Error while registering" });
            }

            return Ok();
        }
        
        
    }
}