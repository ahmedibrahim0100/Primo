﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.Models
{
    //This class should be better named "ItemDBModel" -- note by Ahmed Ibrahim on 18/5/2021
    public class ItemModel
    {
        public int ItemId { get; set; }
        public string ItemNameEnglish { get; set; }
        public string ItemOtherName { get; set; }
        public DateTime ExpiryDate { get; set; }
        public decimal Stock { get; set; }
        public decimal ItemSellingPrice { get; set; }
        public int ProducerCompanyId { get; set; }
        public decimal ItemBuyingDiscountPercentage { get; set; }
        public decimal ItemBuyingPrice { get; set; }
        public decimal TaxesPercentageOnBuying { get; set; }
        public decimal TaxesValueOnBuying { get; set; }
        public decimal TaxesPercentageOnSelling { get; set; }
        public decimal TaxesValueOnSelling { get; set; }
        public string ItemDescription { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModified { get; set; }
        public string ItemStatus { get; set; }

    
        
    }
}
