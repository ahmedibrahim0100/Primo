using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.Models
{
    /// <summary>
    /// Describes SellingTransactionType: On-site | Delivery | Contract, etc
    /// </summary>


    public class SellingTransactionTypeModel
    {
        public int Id { get; set; }
        public string SellingTransactionType { get; set; }
    }
}
