using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.Models
{
    public class SellingTransactionMasterDBModel
    {
        public int TransactionId { get; set; }
        public int SellingTransactionTypeId { get; set; }
        public DateTime TransactionTiming { get; set; }
        public decimal Subtotal { get; set; }
        public decimal calculatedTaxesPercentage { get; set; }
        public decimal calculatedTaxesValue { get; set; }
        public decimal calculatedDiscountPercentage { get; set; }
        public decimal calculatedDiscountValue { get; set; }
        public decimal TaxesPercentageOverInvoice { get; set; }
        public decimal TaxesValueOverInvoice { get; set; }
        public decimal DiscountPercentageOverInvoice { get; set; }
        public decimal DiscountValueOverInvoice { get; set; }
        public decimal Total { get; set; }
        public string SellerId { get; set; }
        public string ShiftOwnerId { get; set; }
        public int CustomerId { get; set; }
        public int NumberOfItems { get; set; }
        public decimal NumberOfPieces { get; set; }
    }
}
