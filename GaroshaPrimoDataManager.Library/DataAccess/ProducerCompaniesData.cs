using GaroshaPrimoDataManager.Library.Internal.DataAccess;
using GaroshaPrimoDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.DataAccess
{
    public class ProducerCompaniesData
    {

        public List<ProducerCompanyDBModel> GetAllProducerCompanies()
        {
            SqlDataAccess sql = new SqlDataAccess();
            var output = sql.LoadData<ProducerCompanyDBModel, dynamic>("dbo.spProducerCompanies_GetAll", new { }, "GaroshaPrimoData");
            return output;
        }
    }
}
