using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using InstructionIO.Models;
using InstructionIO.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace InstructionIO.Api
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class DataHomeController : Controller
    {
        private ApplicationDbContext _context;
        private IEnumerable<Instruction> _unstructions=null;
        private int _stepTake =10;
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

        [HttpGet("instruction/popular/category/{category}/{page}")]
        public IEnumerable<Instruction> getListPopulInstruction(string category, int page)
        {
            if (category == "Full"){
                _unstructions = _context.Instructions.Include(t => t.Author).Include(t => t.Category).AsNoTracking().ToList().OrderByDescending(x => x.Rating);
             } else{
                _unstructions = _context.Instructions.Where(x => x.Category.Name == category).Include(t => t.Author).Include(t => t.Category).AsNoTracking().ToList().OrderByDescending(x => x.Rating);
             }
            return _unstructions.Skip(page * _stepTake).Take(_stepTake);
        }

        [HttpGet("instruction/lastchange/category/{category}/{page}")]
        public IEnumerable<Instruction> getListLastAddInstruction(string category, int page)
        {
            if (category == "Full"){
                _unstructions = _context.Instructions.Include(t => t.Author).Include(t => t.Category).AsNoTracking().ToList().OrderByDescending(x => x.LastChangedDate);
            }else {
                _unstructions = _context.Instructions.Where(x => x.Category.Name == category).Include(t => t.Author).Include(t => t.Category).AsNoTracking().ToList().OrderByDescending(x => x.LastChangedDate);
            }
            return _unstructions.Skip(page * _stepTake).Take(_stepTake);

        }

        [HttpGet("categories")]
        public IEnumerable<Category> getCategories()
        {
            IEnumerable<Category> category = _context.Categorys.AsNoTracking().ToList();
            return category;
        }

        [HttpGet("instruction/full/category/{category}/{page}")]
        public IEnumerable<Instruction> getFullListInstruction(string category,int page)
        {
            if (category == "Full"){
                _unstructions = _context.Instructions.Include(t => t.Author).Include(t => t.Category).AsNoTracking().ToList().OrderByDescending(x => x.LastChangedDate); }
            else {
                _unstructions = _context.Instructions.Where(x => x.Category.Name ==category).Include(t => t.Author).Include(t => t.Category).AsNoTracking().ToList().OrderByDescending(x => x.LastChangedDate);
             }
            return _unstructions.Skip(page* _stepTake).Take(_stepTake);
        }

       

    }
}

