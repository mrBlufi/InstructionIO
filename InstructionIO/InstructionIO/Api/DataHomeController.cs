using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using InstructionIO.Models;
using InstructionIO.Data;
using System.Collections;

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
    }
}