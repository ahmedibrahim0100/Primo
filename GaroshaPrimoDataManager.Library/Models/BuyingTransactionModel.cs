using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.Models
{
    public class BuyingTransactionModel
    {
        public decimal Subtotal { get; set; }
        public decimal CalculatedTaxesPercentage { get; set; }
        public decimal CalculatedTaxesValue { get; set; }
        public decimal CalculatedRetailDiscountPercentage { get; set; }
        public decimal CalculatedRetailDiscountValue { get; set; }
        public decimal TaxesPercentageOverInvoice { get; set; }
        public decimal TaxesValueOverInvoice { get; set; }
        public decimal RetailDiscountPercentageOverInvoice { get; set; }
        public decimal RetailDiscountValueOverInvoice { get; set; }
        public decimal Total { get; set; }
        public string UserId { get; set; }
        public string ShiftOwnerId { get; set; }
        public int VendorId { get; set; }
        public int NumberOfItems { get; set; }
        public decimal NumberOfPieces { get; set; }
        public BuyingTransactionItemModel[] BuyingTransactionItems { get; set; }
    }
}
