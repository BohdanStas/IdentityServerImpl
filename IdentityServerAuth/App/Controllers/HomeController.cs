using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace App.Controllers
{
    public class HomeController : Controller
    {
        [Authorize]
        public string GetSecret()
        {
            return "Secret string";
        }
    }
}
