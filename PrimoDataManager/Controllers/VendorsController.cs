using GaroshaPrimoDataManager.Library.DataAccess;
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
    [RoutePrefix("api/Vendors")]
    public class VendorsController : ApiController
    {
        [HttpGet]
        [Route("GetAllVendors")]
        public List<VendorDBModel> GetAllVendors()
        {
            VendorsData data = new VendorsData();
            return data.GetAllVendors();
        }
    }
}
