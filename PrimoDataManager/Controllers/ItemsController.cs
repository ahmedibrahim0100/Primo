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
    [RoutePrefix("api/Items")]
    public class ItemsController : ApiController
    {
        [HttpGet]
        public List<ItemModel> GetAllItems()
        {
            ItemData data = new ItemData();
            return data.GetAllItems();
        }

        [HttpGet]
        [Route("GetItemsByIdentifier")]
        public List<ItemModel> GetItemsByIdentifier(string identifier)
        {
            ItemData data = new ItemData();
            return data.GetItemsByIdentifier(identifier);
        }

        [HttpPost]
        [Route("AddNewItem")]
        public IHttpActionResult SaveNewItem([FromBody]NewItemModel newItem)
        {
            ItemData data = new ItemData();
            data.SaveNewItem(newItem);

            return Ok();
        }

    }
}
