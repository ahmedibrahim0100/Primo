using GaroshaPrimoDataManager.Library.Internal.DataAccess;
using GaroshaPrimoDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.DataAccess
{
    public class VendorsData
    {
        public List<VendorDBModel> GetAllVendors()
        {
            SqlDataAccess sql = new SqlDataAccess();
            var output = sql.LoadData<VendorDBModel, dynamic>("dbo.spVendors_GetAll", new { }, "GaroshaPrimoData");
            return output;
        }
    }
}
