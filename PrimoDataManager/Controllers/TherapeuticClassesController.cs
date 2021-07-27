using GaroshaPrimoDataManager.Library.DataAccess;
using GaroshaPrimoDataManager.Library.Internal.DataAccess;
using GaroshaPrimoDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PrimoDataManager.Controllers
{
    //[Authorize]
    [RoutePrefix("api/TherapeuticClasses")]
    public class TherapeuticClassesController : ApiController
    {
        [HttpGet]
        [Route("GetAllTherapeuticClasses")]
        public List<TherapeuticClassDBModel> GetAllTherapeuticClasses()
        {
            TherapeuticClassesData data = new TherapeuticClassesData();
            return data.GetAllTherapeuticClasses();
        }
    }
}
