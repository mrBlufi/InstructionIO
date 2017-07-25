using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using InstructionIO.Models;
using InstructionIO.Data;
using System.Collections;
using Microsoft.EntityFrameworkCore;

namespace InstructionIO.Api
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class DataHomeController : Controller
    {
        private ApplicationDbContext _context;

       public DataHomeController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet("tag")]
        public IEnumerable<Tag> getPopulTagsar()
        {
            IEnumerable <Tag> populartag= _context.Tags.ToList().OrderBy(d => d.Name).Take(6);
            return populartag;
        }

        [HttpGet("instruction/popular")]
        public IEnumerable<Instruction> getPopulInstruction()
        {
            IEnumerable<Instruction> unstructions = _context.Instructions.Include(t=>t.Author).ToList();
            return unstructions;
        }

        //[HttpGet("instruction/popular")]
        //public IEnumerable<Tag> getPopulInstruction()
        //{
        //    IEnumerable<Tag> populartag = _context.Tags.ToList().OrderBy(d => d.Name).Take(6);
        //    return populartag;
        //}
    }
}