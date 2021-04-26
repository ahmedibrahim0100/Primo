using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.Models
{
    public class SellingTransactionModel
    {
        public int SellingTransactionTypeId;
        public decimal Subtotal;
        public decimal CalculatedTaxesPercentage;
        public decimal CalculatedTaxesValue;
        public decimal CalculatedDiscountPercentage;
        public decimal CalculatedDiscountValue;
        public decimal TaxesPercentageOverInvoice;
        public decimal TaxesValueOverInvoice;
        public decimal DiscountPercentageOverInvoice;
        public decimal DiscountValueOverInvoice;
        public decimal Total;
        public string SellerId;
        public string ShiftOwnerId;
        public int CustomerId;
        public int NumberOfItems;
        public decimal NumberOfPieces;
        public InvoicePaymentModel InvoicePayment;
        public SellingTransactionItemModel[] SaleItems;
    }
}
