using BusinessLogicLayer.Modals;
using BusinessLogicLayer.UserServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusRental.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserManager _userManager;

        public UserController(IUserManager userManager)
        {
            _userManager = userManager;
        }

        [HttpPost]
        [Route("sign-in")]
        public async Task<IActionResult> GetUserDetail([FromBody] LoginCredentials credentials)
        {
            var user = await _userManager.GetUserDetail(credentials);
            if(user != null)
            {
                return Ok(new {message="Success",user.Id,user.UserName,user.Phone,user.IsAdmin});
            }
            return BadRequest();
        }
    }
}
