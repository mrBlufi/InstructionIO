using InstructionIO.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InstructionIO.Api
{
    public class InstructionFull
    {
        public List<string> tags;
        public List<StepFull> steps;
        public List<CommentFull> comments;
        public Instruction instruction;

        public InstructionFull(Instruction _instruction)
        {
            instruction = _instruction;
            //tags = new List<string>();
            steps = new List<StepFull>();
            //instruction.Rating = _instruction.RatingRelation.Average(x => x.Value);
           // comments = new List<CommentFull>();
            //for (int i = 0; i < _instruction.TagsRelation.Count; i++)
            //{
            //    tags.Add(_instruction.TagsRelation.ElementAt(i).Tag.Name);
            //}
            
            for (int i = 0; i < _instruction.Step.Count; i++)
            {
                steps.Add(new StepFull(_instruction.Step.ElementAt(i)));
            }

            //for (int i = 0; i < _instruction.Comment.Count; i++)
            //{
            //    comments.Add(new CommentFull(_instruction.Comment.ElementAt(i)));
            //}
           // instruction.TagsRelation = new List<TagsRelation>();
            instruction.Step = new List<Step>();
            //instruction.Comment = new List<Comment>();
            //instruction.RatingRelation = new List<RatingRelation>();
        }
    }
    public class StepFull{
        public int id;
        public int number;
        public string subtitle;
        public List<ContentFull> bloks;

        public StepFull(Step _step)
        {
            id = _step.Id;
            number = _step.Number;
            subtitle = _step.Subtitle;
            bloks = new List<ContentFull>();
            for (int i = 0; i < _step.ContentBlock.Count; i++)
            {
                bloks.Add(new ContentFull(_step.ContentBlock.ElementAt(i)));
            }

        }
    }
    public class ContentFull
    {
        public int id;
        public string type;
        public string content;

        public ContentFull(ContentBlock _content)
        {
            id = _content.Id;
            type = _content.Type;
            content = _content.Content;

        }
    }

    public class CommentFull
    {
        public int id;
        public UserInfo author;
        public string context;
        public DateTime dateCreate;
        public CommentFull(Comment _comment)
        {
            id = _comment.Id;
            author = _comment.Author;
            context = _comment.Context;
            dateCreate = _comment.DateCreate;
        }
       
    }
}
