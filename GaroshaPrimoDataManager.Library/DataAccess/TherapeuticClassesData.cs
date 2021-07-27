using GaroshaPrimoDataManager.Library.Internal.DataAccess;
using GaroshaPrimoDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.DataAccess
{
    public class TherapeuticClassesData
    {
        public List<TherapeuticClassDBModel> GetAllTherapeuticClasses()
        {
            SqlDataAccess sql = new SqlDataAccess();
            var output = sql.LoadData<TherapeuticClassDBModel, dynamic>("dbo.spTherapeuticClass_GetAll", new { }, "GaroshaPrimoData");
            return output;
        }
    }
}
