using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

using Microsoft.AspNetCore.Mvc;
using InstructionIO.Models;
using InstructionIO.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;

namespace InstructionIO.Controllers.Api { 

    [Produces("application/json")]
    [Route("api/[controller]")]
    public class InstructionController : Controller
    {
        ApplicationDbContext context;
        UserManager<ApplicationUser> userManager;

        public InstructionController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }
        [Authorize(Roles = "Admin,User")]
        [HttpGet("get")]
        public IActionResult GetInstruction(int? id)
        {
            Instruction instruction = new Instruction()
            {
                CreateDate = DateTime.Now,
                LastChangedDate = DateTime.Now
            };
            if (id != null)
            {
                instruction = context.Instructions.Where(instruct => instruct.Id == id)
                    .Include(inst => inst.Author)
                    .Include(inst => inst.Step).ThenInclude(step => step.ContentBlock)
                    .Include(inst => inst.Comment)
                    .Include(inst => inst.TagsRelation).ThenInclude(tag => tag.Tag)
                    .FirstOrDefault();
            }
            return new ObjectResult(instruction);
        }

        [HttpGet("getfull")]
        public IActionResult GetInstructionfull(int? id)
        {
            Instruction instruction = new Instruction();
            if (id != null)
            {
                instruction = context.Instructions.Where(instruct => instruct.Id == id)
                    .Include(inst => inst.Author)
                    .Include(inst => inst.Step).ThenInclude(step => step.ContentBlock)
                    .Include(inst => inst.Comment)
                    .Include(inst => inst.TagsRelation).ThenInclude(tag=>tag.Tag)
                    .Include(inst=>inst.RatingRelation)
                    .Include(inst=>inst.Category)
                    .FirstOrDefault();
            }
            return new ObjectResult(instruction);
        }
        [Authorize(Roles = "Admin,User")]
        [HttpGet("tags")]
        public IActionResult GetTags(string mask = "")
        {
            return new ObjectResult(context.Tags.Where(tag => tag.Name.Contains(mask)));
        }
        [Authorize(Roles = "Admin,User")]
        [HttpPost("update")]
        public  IActionResult UpdateInstruction([FromBody]Instruction instruction)
        {
            var comments = context.Comments.Where(x => x.Instruction.Id == instruction.Id).ToList();
            var ratings = context.RatingRelations.Where(x => x.Instruction.Id == instruction.Id).ToList();
            context.Remove(context.Instructions.Find(instruction.Id));
            instruction.Id = 0;
            foreach (var step in instruction.Step)
            {
                step.Id = 0;
                foreach (var contentBlock in step.ContentBlock)
                {
                    contentBlock.Id = 0;
                }
            }
            instruction.Comment = comments;
            instruction.RatingRelation = ratings;
            return CreateInstruction(instruction);
        }
        [Authorize(Roles = "Admin,User")]
        [HttpPost("create")]
        public IActionResult CreateInstruction([FromBody]Instruction instruction)
        {
            var n = context.Users.Find(userManager.GetUserId(HttpContext.User));
            instruction.Author = context.UserInfos.Where(User => User.User == n).First();
            foreach (var tagsRelation in instruction.TagsRelation)
            {
                tagsRelation.Id = 0;
                tagsRelation.Tag = context.Tags.Find(tagsRelation.Tag.Id) ?? tagsRelation.Tag;
                tagsRelation.Tag.Frequency++;
            }
            instruction.LastChangedDate = DateTime.Now;
            context.Entry(instruction.Category).State = EntityState.Modified;
            context.Instructions.Add(instruction);          
            context.SaveChanges();
            return Ok(instruction.Id);
        }

        [Authorize(Roles = "Admin,User")]
        [HttpPost("deleteinstruction")]
        public IActionResult DeleteInstruction([FromBody]int idI)
        {
            context.Instructions.Remove(context.Instructions.FirstOrDefault(x=>x.Id==idI));
            context.SaveChanges();
            return Ok();
        }
    }
}