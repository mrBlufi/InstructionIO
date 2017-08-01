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



        [HttpGet("user/my")]
        public async Task<UserInfo> GetMyProfileAsync(string userparams)
        {
            ApplicationUser user = await _userManager.GetUserAsync(HttpContext.User);

            var messages = _context.UserInfos.FirstOrDefault(f => f.User.Id == user.Id);
            messages.User = null;


            return messages;
        }

        [HttpGet("user/{userparams}")]
        public UserInfo GetUserProfile(string userparams)
        {
            var messages = _context.UserInfos.FirstOrDefault(f => f.Id == Convert.ToInt32(userparams));
            messages.User = null;


            return messages;
        }


        [HttpGet("instruction/user/{userID}/{page}")]
        public IEnumerable<Instruction> GetInstructionUserID(int userID, int page)
        {
            IEnumerable<Instruction> _unstructions = _context.Instructions.Where(x => x.Author.Id == userID).Include(t => t.Author).Include(t => t.Category).AsNoTracking().ToList();

            return _unstructions.Skip(page * _stepTake).Take(_stepTake);
        }

        [HttpGet("instruction/user/my/{page}")]
        public async Task<IEnumerable<Instruction>> GetInstructionUserAsync(int page)
        {
            ApplicationUser user = await _userManager.GetUserAsync(HttpContext.User);
            var userinfo = _context.UserInfos.FirstOrDefault(f => f.User.Id == user.Id);
            IEnumerable<Instruction> _unstructions = _context.Instructions.Where(x => x.Author.Id == userinfo.Id).Include(t => t.Author).Include(t => t.Category).AsNoTracking().ToList();

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

        [HttpGet("test")]
        public IActionResult GetTest()
        {
            var test = _context.Instructions.Include(x => x.Step).ThenInclude(x => x.ContentBlock)
                .Include(x => x.TagsRelation).ThenInclude(x => x.Tag)
                .Include(x => x.Author).Include(x => x.Category).Include(x => x.RatingRelation)
                .Include(x => x.Comment).ToList();
            return new ObjectResult(test);
        }

        [HttpGet("test12")]
        public async Task<IActionResult> GetTest12Async()
        {
            bool roles = false;
            ApplicationUser user = await _userManager.GetUserAsync(HttpContext.User);
            if (user != null)
                roles = await _userManager.IsInRoleAsync(user,"User");
           
            return new ObjectResult(roles);
        }
    }
}