using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.Models
{
    public class BuyingTransactionItemModel
    {
        //public int BuyingTransactionId { get; set; }
        public int ItemId { get; set; }
        public DateTime ItemExpiryDate { get; set; }
        public decimal BuyingTransactionItemQuantity { get; set; }
        public decimal ItemSellingPrice { get; set; }
        public decimal ItemBuyingDiscountPercentage { get; set; }
        public decimal ItemBuyingPrice { get; set; }
        public decimal ItemSubtotal { get; set; }
        public decimal ItemBuyingTaxesPercentage { get; set; }
        public decimal ItemBuyingTaxesValue { get; set; }
        public decimal ItemTotal { get; set; }
        //public decimal ItemStock { get; set; }
    }
}
