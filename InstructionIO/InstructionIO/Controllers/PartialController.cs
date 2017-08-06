using Microsoft.AspNetCore.Mvc;
using InstructionIO.Models;
using InstructionIO.Data;
using System;
using Microsoft.AspNetCore.Authorization;

namespace InstructionIO.Controllers
{
    public class PartialController : Controller
    {
        public IActionResult AppComponent() => PartialView();
        
        public IActionResult IndexComponent() => PartialView();

        public IActionResult ProfileComponent() => PartialView();

        public IActionResult ContentChildHomeComponent() => PartialView();

        [Authorize(Roles = "Admin,User")]
        public IActionResult StepEditorComponent() => PartialView();

        [Authorize(Roles = "Admin,User")]
        public IActionResult InstructionEditorComponent() => PartialView();

        public IActionResult InstructionView() => PartialView();

        [Authorize(Roles = "Admin,User")]
        public IActionResult VideoModalComponent() => PartialView();

        [Authorize(Roles = "Admin,User")]
        public IActionResult DeleteUserModalComponent() => PartialView();

        [Authorize(Roles = "Admin,User")]
        public IActionResult DeleteInstructionModalComponent() => PartialView();

        public IActionResult CommentComponent() => PartialView();

        public IActionResult SearchComponent() => PartialView();

        public IActionResult StepComponent() => PartialView();
    }
}
