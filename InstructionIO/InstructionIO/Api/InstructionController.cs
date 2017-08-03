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

        [HttpGet("get")]
        public IActionResult GetInstruction(int? id)
        {
            Instruction instruction = null;
            if (id != null)
            {
                instruction = context.Instructions.Where(instruct => instruct.Id == id)
                    .Include(inst => inst.Author)
                    .Include(inst => inst.Step).ThenInclude(step => step.ContentBlock)
                    .Include(inst => inst.Comment)
                    .Include(inst => inst.TagsRelation)
                    .FirstOrDefault();

            }
            instruction = instruction ?? new Instruction();
            return new ObjectResult(instruction);
        }

        [HttpPost("update")]
        public  IActionResult UpdateInstruction([FromBody]Instruction instruction)
        {
            Instruction oldInstruction = context.Instructions.Find(instruction.Id);
            if (oldInstruction != null)
            {
                context.Instructions.Remove(oldInstruction);
                context.SaveChanges();
            }
            return Ok(this.CreateInstruction(instruction));
        }

        [HttpPost("create")]
        public IActionResult CreateInstruction([FromBody]Instruction instruction)
        {
            context.Entry(instruction).State = EntityState.Added;
            var n = context.Users.Find(userManager.GetUserId(HttpContext.User));
            instruction.Author = context.UserInfos.Where(User => User.User == n).ToArray()[0];
            context.Instructions.Add(instruction);
            context.Instructions.Update(instruction);
            context.SaveChanges();
            return Ok();
        }
    }
}