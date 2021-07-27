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
    [RoutePrefix("api/ProducerCompanies")]
    public class ProducerCompaniesController : ApiController
    {
        [HttpGet]
        [Route("GetAllProducerCompanies")]
        public List<ProducerCompanyDBModel> GetAllProducerCompanies()
        {
            ProducerCompaniesData data = new ProducerCompaniesData();
            return data.GetAllProducerCompanies();
        }
    }
}
