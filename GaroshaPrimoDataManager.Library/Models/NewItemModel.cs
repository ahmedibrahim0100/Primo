using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.Models
{
    public class NewItemModel
    {
        public string ItemNameEnglish { get; set; }
        public string ItemOtherName { get; set; }
        public int ProducerCompanyId { get; set; }
        public decimal ItemSellingPrice { get; set; }
        public decimal ItemBuyingDiscountPercentage { get; set; }
        public decimal ItemBuyingPrice { get; set; }
        public decimal TaxesPercentageOnBuying { get; set; }
        public decimal TaxesValueOnBuying { get; set; }
        public decimal TaxesPercentageOnSelling { get; set; }
        public decimal TaxesValueOnSelling { get; set; }
        public string ItemDescription { get; set; }
        public string ItemStatus { get; set; }

        public string[] ItemCodes { get; set; }
        public int[] TherapeuticClassesIds { get; set; }
        public int[] IngredientsIds { get; set; }
    }
}
