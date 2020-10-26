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
    [RoutePrefix("api/Customers")]
    public class CustomersController : ApiController
    {
        [HttpGet]
        [Route("GetCustomersByIdentifier")]
        public List<CustomerModel> GetCustomersByIdentifier(string identifier)
        {
            CustomerData data = new CustomerData();
            return data.GetCustomersByIdentifier(identifier);
        }
    }
}
