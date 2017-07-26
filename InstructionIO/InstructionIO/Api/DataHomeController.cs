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
        public IEnumerable<Tag> getListPopulTags()
        {
            IEnumerable <Tag> populartag= _context.Tags.AsNoTracking().ToList().OrderBy(d => d.Name).Take(6);
            return populartag;
        }

        [HttpGet("instruction/popular/category/{category}")]
        public IEnumerable<Instruction> getListPopulInstruction(string category)
        {
           IEnumerable<Instruction> unstructions = null;
            if (category == "Full")
            {
                unstructions = _context.Instructions.Include(t => t.Author).Include(t => t.Category).AsNoTracking().ToList().OrderBy(x => x.Rating);

            }
            else
            {
                unstructions = _context.Instructions.Where(x => x.Category.Name == category).Include(t => t.Author).Include(t => t.Category).AsNoTracking().ToList().OrderBy(x => x.Rating);

            }

            return unstructions;
        }

        [HttpGet("instruction/lastchange/category/{category}")]
        public IEnumerable<Instruction> getListLastAddInstruction(string category)
        {
            IEnumerable<Instruction> unstructions = null;
            if (category == "Full")
            {
                unstructions = _context.Instructions.Include(t => t.Author).Include(t => t.Category).AsNoTracking().ToList().OrderByDescending(x => x.LastChangedDate);
            }
            else
            {
                unstructions = _context.Instructions.Where(x => x.Category.Name == category).Include(t => t.Author).Include(t => t.Category).AsNoTracking().ToList().OrderByDescending(x => x.LastChangedDate);
            }
            return unstructions;

        }

        [HttpGet("categories")]
        public IEnumerable<Category> getCategories()
        {
            IEnumerable<Category> category = _context.Categorys.AsNoTracking().ToList();
            return category;
        }

        [HttpGet("instruction/full/category/{category}")]
        public IEnumerable<Instruction> getFullListInstruction(string category)
        {
            IEnumerable<Instruction> unstructions=null;
            if (category == "Full"){
                unstructions = _context.Instructions.Include(t => t.Author).Include(t => t.Category).AsNoTracking().ToList().OrderByDescending(x => x.LastChangedDate);

            }
            else
            {
                unstructions = _context.Instructions.Where(x => x.Category.Name ==category).Include(t => t.Author).Include(t => t.Category).AsNoTracking().ToList().OrderByDescending(x => x.LastChangedDate);

            }
            return unstructions;
        }

    }
}

