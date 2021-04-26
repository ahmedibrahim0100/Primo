using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.Models
{
    public class SellingTransactionItemDBModel
    {
        public int Id { get; set; }
        public int SellingTransactionId { get; set; }
        public int ItemId { get; set; }
        public DateTime ItemExpiryDate { get; set; }
        public decimal SellingTransactionItemQuantity { get; set; }
        public decimal ItemSellingPrice { get; set; }
        public decimal ItemSubtotal { get; set; }
        public decimal ItemSellingDiscountPercentage { get; set; }
        public decimal ItemSellingDiscountValue { get; set; }
        public decimal ItemSellingTaxesPercentage { get; set; }
        public decimal ItemSellingTaxesValue { get; set; }
        public decimal ItemTotal { get; set; }
        public decimal ItemCostOnSelling { get; set; }
    }
}
