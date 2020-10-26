using GaroshaPrimoDataManager.Library.Internal.DataAccess;
using GaroshaPrimoDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.DataAccess
{
    public class ItemData
    {
        public List<ItemModel> GetAllItems()
        {
            SqlDataAccess sql = new SqlDataAccess();
            var output = sql.LoadData<ItemModel, dynamic>("dbo.spItems_GetAll", new { }, "GaroshaPrimoData");
            return output;
        }

        public List<ItemModel> GetItemsByIdentifier(string identifier)
        {
            SqlDataAccess sql = new SqlDataAccess();
            var p = new { identifier = identifier };
            var output = sql.LoadData<ItemModel, dynamic>("dbo.spItems_SearchByIdentifier", p, "GaroshaPrimoData");

            return output;
        }
    }
}
