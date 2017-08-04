using Microsoft.AspNetCore.Mvc;
using InstructionIO.Models;
using InstructionIO.Data;
using System;

namespace InstructionIO.Controllers
{
    public class PartialController : Controller
    {
      

       

        public IActionResult AppComponent() => PartialView();

        public IActionResult ContactComponent() => PartialView();

        public IActionResult IndexComponent() => PartialView();

        public IActionResult ProfileComponent() => PartialView();

        public IActionResult ContentChildHomeComponent() => PartialView();

        public IActionResult StepEditorComponent() => PartialView();

        public IActionResult InstructionEditorComponent() => PartialView();

        public IActionResult InstructionView() => PartialView();

        public IActionResult VideoModalComponent() => PartialView();

        public IActionResult CommentComponent() => PartialView();

        public IActionResult SearchComponent() => PartialView();

        public IActionResult StepComponent() => PartialView();
    }
}
