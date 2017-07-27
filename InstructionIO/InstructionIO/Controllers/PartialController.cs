using Microsoft.AspNetCore.Mvc;

namespace InstructionIO.Controllers
{
    public class PartialController : Controller
    {
        public IActionResult AboutComponent() => PartialView();

        public IActionResult AppComponent() => PartialView();

        public IActionResult ContactComponent() => PartialView();

        public IActionResult IndexComponent() => PartialView();

        public IActionResult ProfileComponent() => PartialView();
        public IActionResult ContentChildHomeComponent() => PartialView();

        public IActionResult StepEditorComponent() => PartialView();
    }
}
