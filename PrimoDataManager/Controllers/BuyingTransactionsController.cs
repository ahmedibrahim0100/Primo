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
    [RoutePrefix("api/BuyingTransactions")]
    public class BuyingTransactionsController : ApiController
    {
        [HttpPost]
        [Route("PostBuyingTransaction")]
        public IHttpActionResult Post([FromBody]BuyingTransactionModel buyingTransactionInfo)
        {
            BuyingTransactionData data = new BuyingTransactionData();
            data.SaveBuyingTransaction(buyingTransactionInfo);

            return Ok();
        }
    }
}
