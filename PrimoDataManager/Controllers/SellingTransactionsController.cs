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
    [RoutePrefix("api/SellingTransactions")]
    public class SellingTransactionsController : ApiController
    {
        [HttpGet]
        [Route("GetAllSellingTransactionTypes")]
        public List<SellingTransactionTypeModel> GetAllSellingTransactionTypes()
        {
            SellingTransactionData data = new SellingTransactionData();
            return data.GetAllSellingTransactionTypes();
        }


        [HttpPost]
        [Route("PostSale")]
        public void Post([FromBody]SellingTransactionModel saleInfo)
        {
            SellingTransactionData data = new SellingTransactionData();
            data.SaveSale(saleInfo);
        }
    }
}
