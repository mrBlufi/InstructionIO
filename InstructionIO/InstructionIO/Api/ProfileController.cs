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
        public async Task<UserInfo> getMyProfileAsync(string userparams)
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
        public IEnumerable<Instruction> getInstructionUserID(int userID, int page)
        {
            IEnumerable<Instruction> _unstructions = _context.Instructions.Where(x =>x.Author.Id==userID).Include(t => t.Author).Include(t => t.Category).AsNoTracking().ToList();
           
            return _unstructions.Skip(page * _stepTake).Take(_stepTake);
        }

        [HttpGet("instruction/user/my/{page}")]
        public async Task<IEnumerable<Instruction>> getInstructionUserAsync(int page)
        {
            ApplicationUser user = await _userManager.GetUserAsync(HttpContext.User);
            var userinfo = _context.UserInfos.FirstOrDefault(f => f.User.Id == user.Id);
            IEnumerable<Instruction> _unstructions = _context.Instructions.Where(x => x.Author.Id == userinfo.Id).Include(t => t.Author).Include(t => t.Category).AsNoTracking().ToList();

            return _unstructions.Skip(page * _stepTake).Take(_stepTake);
        }


        [HttpPost("user/update")]
        public UserInfo setUserProfile([FromBody]UserInfo userprofile)
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
        public IActionResult getTest()
        {
            var test = _context.Instructions.Include(x => x.Step).ThenInclude(x => x.ContentBlock).ToList().Find(x=>x.Id==1);
            return new ObjectResult(test.Step.ToList());
        }














    }
}