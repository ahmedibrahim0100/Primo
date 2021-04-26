using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.Models
{
    public class InvoicePaymentModel
    {
        public decimal cash;
        public BankCardPaymentDBModel[] bankCardsPayments;
        public ContractorPaymentDBModel[] contractorsPayments;
    }
}
