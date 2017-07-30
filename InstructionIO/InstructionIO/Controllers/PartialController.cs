using Microsoft.AspNetCore.Mvc;
using InstructionIO.Models;
using InstructionIO.Data;
using System;

namespace InstructionIO.Controllers
{
    public class PartialController : Controller
    {
        //public PartialController(ApplicationDbContext db)
        //{
        //    var userInfo = new UserInfo()
        //    {
        //        FullName = "Kirill",
        //        User = db.Users.Find("fabd324a-4e3c-48d0-be38-b9e6dfedd767")
        //    };

        //    var instruction = new Instruction()
        //    {
        //        Author = userInfo,
        //        CreateDate = DateTime.Now,
        //        Name = "instruction"
        //    };

        //    var Step = new Step()
        //    {
        //        Instruction = instruction,
        //        Subtitle = "step"
        //    };

        //    var content = new ContentBlock()
        //    {
        //        Step = Step,
        //        Type = "text",
        //        Content = "content vov ov"
        //    };

        //    db.Add(content);
        //    db.SaveChanges();
        //}

        public IActionResult AboutComponent() => PartialView();

        public IActionResult AppComponent() => PartialView();

        public IActionResult ContactComponent() => PartialView();

        public IActionResult IndexComponent() => PartialView();

        public IActionResult ProfileComponent() => PartialView();

        public IActionResult ContentChildHomeComponent() => PartialView();

        public IActionResult StepEditorComponent() => PartialView();

        public IActionResult InstructionEditorComponent() => PartialView();

        public IActionResult VideoModalComponent() => PartialView();
    }
}
