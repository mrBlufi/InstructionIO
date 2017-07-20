using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InstructionIO.Models
{

    public class UserInfo
    {
        public int Id { get; set; }
        [Required]
        public ApplicationUser User { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
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
        public int Rating { get; set; }
    }

    public class Step
    {
        public int Id { get; set; }
        [Required]
        public Instruction Instruction { get; set; }
        public int Number { get; set; }
        public string Subtitle { get; set; }
    }

    public class ContentBlock
    {
        public int Id { get; set; }
        [Required]
        public Step Step { get; set; }
        public string Type { get; set; }
        public string Content { get; set; }
    }

    public class Comment
    {
        public int Id { get; set; }
        [Required]
        public Instruction Instruction { get; set; }
        public UserInfo Author { get; set; }
        public string Context { get; set; }
        public DateTime DateCreate { get; set; }
    }

    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class TagsRelation
    {
        public int Id { get; set; }
        [Required]
        public Tag Tag { get; set; }
        public Instruction Instruction { get; set; }
    }

    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

}
