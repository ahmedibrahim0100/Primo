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
    [RoutePrefix("api/Ingredients")]
    public class IngredientsController : ApiController
    {
        [HttpGet]
        [Route("GetAllIngredients")]
        public List<IngredientDBModel> GetAllIngredients()
        {
            IngredientsData data = new IngredientsData();
            return data.GetAllIngredients();
        }
    }
}
