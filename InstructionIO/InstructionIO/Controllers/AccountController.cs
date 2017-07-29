using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using InstructionIO.Models;
using InstructionIO.Services;
using InstructionIO.Data;

namespace InstructionIO.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        ApplicationDbContext _context;

        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager, ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }

        //static UserInfo info = new UserInfo()
        //{
        //    Birthday = new DateTime(1992, 3, 20),
        //    Interests = "bla bla lba",
        //    FirstName = "Firstname",
        //    LastName = "Lastname",

        //};
        //ApplicationDbContext db ;

        //public async Task<IActionResult> ProfilePage()
        //{

        //    ApplicationUser user = await _userManager.GetUserAsync(HttpContext.User);

        //    var messages = db.UserInfos.Where(f => f.User.Id == user.Id);
        //    if (messages.ToList().Count == 0)
        //    {


        //        UserInfo usercreate = new UserInfo() {
        //            Birthday = new DateTime(1992, 3, 20),
        //            Interests = "Click on the pencil to edit" ,
        //            FirstName = "FirstName",
        //            LastName = "LastName",
        //            User = user

        //        };
        //        db.UserInfos.Add(usercreate);
        //        db.SaveChanges();
        //        return View(usercreate);
        //    }
        //    else
        //    {
        //        return RedirectToAction("Index", "Home");
        //    }

        //}
        //

        //
        // POST: /Account/Logout
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction(nameof(HomeController.Index), "Home");
        }

        //
        // POST: /Account/ExternalLogin
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public IActionResult ExternalLogin(string provider, string returnUrl = null)
        {
            // Request a redirect to the external login provider.
            var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "Account", new { ReturnUrl = returnUrl });
            var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
            return Challenge(properties, provider);
        }

        //
        // GET: /Account/ExternalLoginCallback
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            if (remoteError != null)
            {
                ModelState.AddModelError(string.Empty, $"Error from external provider: {remoteError}");

            }
            var info = await _signInManager.GetExternalLoginInfoAsync();
           
            var result = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);
            if (result.Succeeded)
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
                
            }
            else
            {

                var email = info.Principal.FindFirstValue(ClaimTypes.Email);

                var user = new ApplicationUser
                {
                    UserName = email == null ? info.Principal.FindFirstValue(ClaimTypes.Name) : email,
                    Email = email
                };
                var result1 = await _userManager.CreateAsync(user);
                var userinfo = new UserInfo()
                {
                    FullName = "Full Name",
                    Birthday = new DateTime(),
                    Interests = "Interests",
                    User = user
                };
                _context.UserInfos.Add(userinfo);
                if (result1.Succeeded)
                {
                    result1 = await _userManager.AddLoginAsync(user, info);
                    if (result1.Succeeded)
                    {
                        await _signInManager.SignInAsync(user, isPersistent: false);
                        return RedirectToAction(nameof(HomeController.Index), "Home");
                    }
                }

                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
        }






        #region Helpers

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction(nameof(HomeController.Index), "Home");
            }
        }

        #endregion
    }
}
