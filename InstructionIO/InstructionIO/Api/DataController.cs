using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using InstructionIO.Models;
using Microsoft.AspNetCore.Authorization;

namespace instructionsIO.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    //[Authorize]
    public class DataController : Controller
    {
        public IEnumerable<UserInfo> Get()
        {
            return new List<UserInfo>
            {
                new UserInfo
                {
                    FirstName = "Dima",
                    LastName = "molchidov"
                },
                new UserInfo
                {
                    FirstName = "Ilya",
                    LastName = "Griboedow"
                }
            };
        }
    }
}