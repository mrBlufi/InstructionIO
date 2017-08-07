using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using InstructionIO.Models;
using InstructionIO.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using InstructionIO.Api;
using Microsoft.AspNetCore.Authorization;

namespace instructionsIO.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProfileController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private int _stepTake = 10;
        private ApplicationDbContext _context;

        public ProfileController(ApplicationDbContext context, UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }
        [Authorize(Roles = "Admin,User")]
        [HttpPost("deleteuser/")]
        public IActionResult DeleteUserById([FromBody]int id)
        {
            var test = _context.UserInfos.Where(x => x.Id == id).Include(x => x.User).First();
            _context.Users.Remove(test.User);
            _context.SaveChanges();
            return Ok();
        }

        [HttpGet("user/{userparams}")]
        public UserInfo GetUserProfile(string userparams)
        {
            var messages = _context.UserInfos.FirstOrDefault(f => f.Id == Convert.ToInt32(userparams));
            if (messages != null)
                messages.User = null;
            return messages;
        }


        [HttpGet("instruction/user/{userID}/{page}")]
        public IEnumerable<Instruction> GetInstructionUserID(int userID, int page)
        {
            IEnumerable<Instruction> _unstructions = _context.Instructions.Where(x => x.Author.Id == userID)
                .Include(x => x.RatingRelation).Include(x => x.TagsRelation)
                .ThenInclude(x => x.Tag).Include(t => t.Author)
                .Include(t => t.Category).ToList();
            return _unstructions.Skip(page * _stepTake).Take(_stepTake);
        }
       
        [HttpPost("user/update")]
        public UserInfo SetUserProfile([FromBody]UserInfo userprofile)
        {
            var messages = _context.UserInfos.FirstOrDefault(f => f.Id == userprofile.Id);
            messages.FullName = userprofile.FullName;
            messages.Avatar = userprofile.Avatar;
            messages.Birthday = userprofile.Birthday;
            messages.Interests = userprofile.Interests;
            _context.UserInfos.Update(messages);
            _context.SaveChanges();
            return messages;
        }
        
        [HttpGet("userimage/{id}")]
        public IActionResult GetImageProfile(int id)
        {
            var test = _context.UserInfos.Find(id).Avatar;
            return new ObjectResult(test);
        }

        [HttpGet("roleinfo")]
        public async Task<IActionResult> GetTest12Async()
        {
            ApplicationUser user = await _userManager.GetUserAsync(HttpContext.User);
            if (user != null)
                return new ObjectResult(new UserInformation()
                {
                    Id = _context.UserInfos.Where(x => x.User.Id == user.Id).First().Id,
                    UserRole = await _userManager.IsInRoleAsync(user, "User"),
                    AdminRole = await _userManager.IsInRoleAsync(user, "Admin")
                });
            else
            return new ObjectResult(getDefault());
        }

        private UserInformation getDefault()
        {
            UserInformation userinf = new UserInformation()
            {
                Id = -1,
                UserRole = false,
                AdminRole = false
            };
            return userinf;
        }

        [HttpGet("getstatistics/{id}")]
        public IActionResult GetStatisticsUser(int id)
        {
            var instruction = _context.Instructions.Where(x => x.Author.Id == id);
            UserStatistics statisc = new UserStatistics()
            {
                CountComment = 0,
                CountInstructions = 0,
                AverageRating = 0
            };
            statisc.CountInstructions = instruction.Count();
            statisc.CountComment = instruction.Count();
            try
            {
                statisc.AverageRating = instruction.Average(x => x.RatingRelation.Average(xs => xs.Value));
            }
            catch
            {
                statisc.AverageRating = 0;
            }
            return new ObjectResult(statisc);
        }
    }

    public class UserInformation
    {
        public int Id { get; set; }
        public bool UserRole { get; set; }
        public bool AdminRole { get; set; }
    }

    public class UserStatistics
    {
        public int CountInstructions { get; set; }
        public int CountComment { get; set; }
        public double AverageRating { get; set; }
    }
}