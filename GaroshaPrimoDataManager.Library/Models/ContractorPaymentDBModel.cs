using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.Models
{
    public class ContractorPaymentDBModel
    {
        public int Id { get; set; }
        public int SellingTransactionId { get; set; }
        public decimal Amount { get; set; }
        public int ContractorId { get; set; }
    }
}
