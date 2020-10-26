using GaroshaPrimoDataManager.Library.Internal.DataAccess;
using GaroshaPrimoDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.DataAccess
{
    public class CustomerData
    {
        public List<CustomerModel> GetCustomersByIdentifier(string identifier)
        {
            SqlDataAccess sql = new SqlDataAccess();
            var p = new { identifier = identifier };
            var output = sql.LoadData<CustomerModel, dynamic>("dbo.spCustomers_SearchByIdentifier", p, "GaroshaPrimoData");

            return output;
        }
    }
}
