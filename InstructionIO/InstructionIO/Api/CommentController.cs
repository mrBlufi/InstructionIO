using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using InstructionIO.Data;
using InstructionIO.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace InstructionIO.Api
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CommentController : Controller
    {
        private ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;

        public CommentController(ApplicationDbContext context, UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;

        }

        [HttpGet("test/comments")]
        public IActionResult GetTest1()
        {
            var test = _context.Comments.Where(x => x.Instruction.Id == 4).Include(x => x.Author).ToList();
            return new ObjectResult(test);
        }
        [HttpPost("test/comments/post")]
        public async Task<IActionResult> GetTest2Async([FromBody] Comment comment)
        {
            var instruction = _context.Instructions.Find(4);
            var user = await _userManager.GetUserAsync(HttpContext.User);
            comment.Author = _context.UserInfos.FirstOrDefault(x => x.User.Id == user.Id);
            instruction.Comment.Add(comment);
            _context.SaveChanges();
            return new ObjectResult(comment);
        }

        [HttpGet("test/comments/del/{id}")]
        public async Task<IActionResult> GetDelCommentAsync(int id)
        {
            var comment = await _context.Comments.FirstOrDefaultAsync(x => x.Id == id);
            if (comment != null)
            {
                 _context.Comments.Remove(comment);
                _context.SaveChanges();
            }
            var test = _context.Comments.Include(x => x.Author).ToList();
            return new ObjectResult(test);
        }

    }
}