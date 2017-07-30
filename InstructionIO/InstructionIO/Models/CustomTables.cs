using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InstructionIO.Models
{

    public class UserInfo
    {
        public int Id { get; set; }
        [Required]
        public ApplicationUser User { get; set; }
        public string FullName { get; set; }
        public DateTime Birthday { get; set; }
        public string Avatar { get; set; }
        public string Interests { get; set; }

       
    }

    public class Instruction
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public UserInfo Author { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime LastChangedDate { get; set; }
        public Category Category { get; set; }
        public double Rating { get; set; }
        public ICollection<TagsRelation> TagsRelation { get; set; }
        public ICollection<Step> Step { get; set; }
        public ICollection<Comment> Comment { get; set; }
        public ICollection<RatingRelation> RatingRelation { get; set; }

        public Instruction()
        {
            TagsRelation = new List<TagsRelation>();
            Step = new List<Step>();
            Comment = new List<Comment>();
            RatingRelation = new List<RatingRelation>();
        }
    }

    public class Step
    {
        public int Id { get; set; }
        [Required]
        [JsonIgnore]
        public Instruction Instruction { get; set; }
        public int Number { get; set; }
        public string Subtitle { get; set; }
        public ICollection<ContentBlock> ContentBlock { get; set; }
    }

    public class ContentBlock
    {
        public int Id { get; set; }
        [Required]
        [JsonIgnore]
        public Step Step { get; set; }
        public string Type { get; set; }
        public string Content { get; set; }
    }

    public class Comment
    {
        public int Id { get; set; }
        [Required]
        [JsonIgnore]
        public Instruction Instruction { get; set; }
        public UserInfo Author { get; set; }
        public string Context { get; set; }
        public DateTime DateCreate { get; set; }
    }

    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Frequency { get; set; }
        public ICollection<TagsRelation> TagsRelation { get; set; }

        public Tag()
        {
            TagsRelation = new List<TagsRelation>();
        }
    }

    public class TagsRelation
    {
        public int Id{ get; set; }
        [Required]
        [JsonIgnore]
        public Instruction Instruction { get; set; }
        [ForeignKey("TagId")]
        public Tag Tag { get; set; }
    }

    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }

    }

    public class RatingRelation
    {
        public int Id { get; set; }
        public int Value { get; set; }
        public UserInfo User { get; set; }
        [Required]
        [JsonIgnore]
        public Instruction Instruction { get; set; }

    }

}
