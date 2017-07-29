using InstructionIO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InstructionIO.Api
{
    public class Instr
    {
        public List<string> tags;
        public Instruction instruction;


        public Instr(Instruction _instruction, List<TagsRelation> tagr)
        {
            instruction = _instruction;
            tags = new List<string>();
            for (int i = 0; i < tagr.Count; i++)
            {
                tags.Add(tagr.ElementAt(i).Tag.Name);
            }
            instruction.TagsRelation = new List<TagsRelation>();
        }
    }
}
