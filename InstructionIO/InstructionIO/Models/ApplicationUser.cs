﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace InstructionIO.Models
{
    public class ApplicationUser : IdentityUser
    {
        internal readonly string id;
    }
}
