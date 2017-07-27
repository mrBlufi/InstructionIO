using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using InstructionIO.Models;

namespace instructionsIO.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProfileController : Controller
    {
        public UserInfo Get()
        {
            return new UserInfo
            {
                FirstName = "gleb",
                LastName = "sidorov",
                Birthday = new DateTime(),
                Interests = @"���������� �����: ������� ���������� �������� (����. Understanding Media: The ... ������� ��������� �������� ������������ �� �������� � ��������� (cool), ���� � ���� �������� �� �����������: �������� ��������",
                Avatar = "https://lut.im/7JCpw12uUT/mY0Mb78SvSIcjvkf.png"
            };
        }
    }
}