using GaroshaPrimoDataManager.Library.Internal.DataAccess;
using GaroshaPrimoDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.DataAccess
{
    public class IngredientsData
    {
        public List<IngredientDBModel> GetAllIngredients()
        {
            SqlDataAccess sql = new SqlDataAccess();
            var output = sql.LoadData<IngredientDBModel, dynamic>("dbo.spIngredient_GetAll", new { }, "GaroshaPrimoData");
            return output;
        }
    }
}
