using GaroshaPrimoDataManager.Library.Internal.DataAccess;
using GaroshaPrimoDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.DataAccess
{
    public class SellingTransactionData
    {
        /// <summary>
        /// Gets all SellingTransactionTypes : On-site | Delivery | Contract, etc
        /// </summary>
        /// <returns></returns>
        public List<SellingTransactionTypeModel> GetAllSellingTransactionTypes()
        {
            SqlDataAccess sql = new SqlDataAccess();
            var output = sql.LoadData<SellingTransactionTypeModel, dynamic>("dbo.spSellingTransactionType_GetAll", new { }, "GaroshaPrimoData");
            return output;
        }
    }
}
