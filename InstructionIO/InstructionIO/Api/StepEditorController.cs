using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using Microsoft.AspNetCore.Http;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http.Internal;

namespace InstructionIO.Api
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class StepEditor : Controller
    {
        Account account = new Account(
        "dgucqeucg",
        "318323863171139",
        "FAeIYrZahE9AQu0KTJPTfKHyCi8");

        private ImageUploadResult UploadToCloudinary(IFormFile file)
        {
            Cloudinary cloudinary = new Cloudinary(account);
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.Name,file.OpenReadStream())
            };
            return cloudinary.Upload(uploadParams);
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload()
        {
            var files = Request.Form.Files;
            return Ok(UploadToCloudinary(files[0]).SecureUri);
        }
    }
}