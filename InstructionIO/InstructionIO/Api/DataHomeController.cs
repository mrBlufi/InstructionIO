using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using InstructionIO.Models;
using InstructionIO.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System.Threading.Tasks;

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
            IEnumerable <Tag> populartag= _context.Tags.AsNoTracking().ToList().OrderBy(d => d.Frequency).Take(6);
            return populartag;
        }

        [HttpGet("instruction/popular/category/{category}/{page}")]
        public IEnumerable<Instruction> getListPopulInstruction(string category, int page)
        {
           
            return getInstructionsCategory(category).OrderByDescending(x => x.Rating).Skip(page * _stepTake).Take(_stepTake);
        }

        [HttpGet("instruction/lastchange/category/{category}/{page}")]
        public IEnumerable<Instruction> getListLastAddInstruction(string category, int page)
        {
               return getInstructionsCategory(category).OrderByDescending(x => x.LastChangedDate).Skip(page * _stepTake).Take(_stepTake);

        }
        [HttpGet("instruction/full/category/{category}/{page}")]
        public IEnumerable<Instruction> GetFullListInstruction(string category, int page)
        {
            return getInstructionsCategory(category).OrderByDescending(x => x.LastChangedDate).Skip(page * _stepTake).Take(_stepTake);
        }

        private IEnumerable<Instruction> getInstructionsCategory(string category)
        {
            if (category == "Full")
            {
                return getInstructions();
            }
            else
            {
                return getInstructions().Where(x => x.Category.Name == category);
              
            }
        }

        private IEnumerable<Instruction> getInstructions()
        {
            return _unstructions = _context.Instructions.Include(x => x.RatingRelation)
                    .Include(x => x.TagsRelation).ThenInclude(x => x.Tag).Include(t => t.Author)
                    .Include(t => t.Category).ToArray();
        }




        [HttpGet("categories")]
        public IEnumerable<Category> GetCategories()
        {
            IEnumerable<Category> category = _context.Categorys.AsNoTracking().ToList();
            return category;
        }

        [HttpGet("instr")]
        public IEnumerable<Instruction> GetTest12()
        {
            IEnumerable<Instruction> category = _context.Instructions.Include(x => x.RatingRelation)
                .Include(x => x.TagsRelation).ThenInclude(x => x.Tag)
                .Include(t => t.Author).Include(t => t.Category).ToArray();
            return category;
        }

       

        [HttpGet("instruction/search/{search}/{page}/{tag}")]
        public IEnumerable<Instruction> GetSearchInstruction(string search,int page,bool tag)
        {
            if (tag)
            {
                _unstructions = _context.Instructions.Where(x => x.TagsRelation.Any(xs => xs.Tag.Name==(search)))
                               .Include(x => x.RatingRelation).Include(x => x.TagsRelation)
                          .ThenInclude(x => x.Tag).Include(t => t.Author)
                          .Include(t => t.Category).ToList();
            }
            else
            {
                _unstructions = _context.Instructions
                    .Where(x => x.Name.Contains(search) || x.TagsRelation.Any(xs => xs.Tag.Name.Contains(search)))
                    .Include(x => x.RatingRelation).Include(x => x.TagsRelation)
               .ThenInclude(x => x.Tag).Include(t => t.Author)
               .Include(t => t.Category).ToList();
            }

           
            return _unstructions.Skip(page * _stepTake).Take(_stepTake);
        }


        [HttpGet("instruction/setrating/{idI}/{idU}/{rating}")]
        public async Task<IActionResult> SetRating(int idI,int idU,int rating)
        {
            var instr = _context.Instructions.FirstOrDefault(x => x.Id == idI);
            var ratingr = _context.RatingRelations.FirstOrDefault(x => x.Instruction.Id == instr.Id && x.User.Id == idU);
            if (ratingr != null)
            {
                ratingr.Value = rating;
                _context.RatingRelations.Update(ratingr);


            }
            else
            {
                RatingRelation ratingrelation = new RatingRelation()
                {
                    Instruction = instr,
                    User = await _context.UserInfos.FindAsync(idU),
                    Value = rating
                };
                await _context.RatingRelations.AddAsync(ratingrelation);
            }
            _context.SaveChanges();
            instr.Rating = _context.RatingRelations.Where(x => x.Instruction.Id == instr.Id).Average(x => x.Value);
            _context.Instructions.Update(instr);
            _context.SaveChanges();
            return Ok();
        }



    }
}

