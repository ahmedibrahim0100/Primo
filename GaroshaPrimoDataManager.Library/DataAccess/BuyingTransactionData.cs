using GaroshaPrimoDataManager.Library.Internal.DataAccess;
using GaroshaPrimoDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.DataAccess
{
    public class BuyingTransactionData
    {
        /// <summary>
        /// saves buying transaction to the database
        /// </summary>
        public void SaveBuyingTransaction(BuyingTransactionModel buyingTransactionInfo)
        {
            BuyingTransactionMasterDBModel masterBuyingTransactionData = new BuyingTransactionMasterDBModel
            {
                TransactionTiming = DateTime.Now,
                Subtotal = buyingTransactionInfo.Subtotal,
                CalculatedTaxesPercentage = buyingTransactionInfo.CalculatedTaxesPercentage,
                CalculatedTaxesValue = buyingTransactionInfo.CalculatedTaxesValue,
                CalculatedRetailDiscountPercentage = buyingTransactionInfo.CalculatedRetailDiscountPercentage,
                CalculatedRetailDiscountValue = buyingTransactionInfo.CalculatedRetailDiscountValue,
                TaxesPercentageOverInvoice = buyingTransactionInfo.TaxesPercentageOverInvoice,
                TaxesValueOverInvoice = buyingTransactionInfo.TaxesValueOverInvoice,
                RetailDiscountPercentageOverInvoice = buyingTransactionInfo.RetailDiscountPercentageOverInvoice,
                RetailDiscountValueOverInvoice = buyingTransactionInfo.RetailDiscountValueOverInvoice,
                Total = buyingTransactionInfo.Total,
                UserId = buyingTransactionInfo.UserId,
                ShiftOwnerId = buyingTransactionInfo.ShiftOwnerId,
                VendorId = buyingTransactionInfo.VendorId,
                NumberOfPieces = buyingTransactionInfo.NumberOfPieces,
                NumberOfItems = buyingTransactionInfo.NumberOfItems
            };

            using (SqlDataAccess sql = new SqlDataAccess())
            {
                try
                {
                    sql.StartTransaction("GaroshaPrimoData");

                    sql.SaveDataInTransaction("dbo.spBuyingTransactionMaster_Insert", masterBuyingTransactionData);

                    masterBuyingTransactionData.TransactionId = sql.LoadDataInTransaction<int, dynamic>("dbo.spBuyingTransactionMaster_GetId",
                        null).FirstOrDefault();


                    foreach (var item in buyingTransactionInfo.BuyingTransactionItems)
                    {
                        BuyingTransactionItemDBModel buyingTransactionItem = new BuyingTransactionItemDBModel
                        {
                            BuyingTransactionId = masterBuyingTransactionData.TransactionId,
                            ItemId = item.ItemId,
                            ItemExpiryDate = item.ItemExpiryDate,
                            BuyingTransactionItemQuantity = item.BuyingTransactionItemQuantity,
                            ItemSellingPrice = item.ItemSellingPrice,
                            ItemBuyingDiscountPercentage = item.ItemBuyingDiscountPercentage,
                            ItemBuyingPrice = item.ItemBuyingPrice,
                            ItemSubtotal = item.ItemSubtotal,
                            ItemBuyingTaxesPercentage = item.ItemBuyingTaxesPercentage,
                            ItemBuyingTaxesValue = item.ItemBuyingTaxesValue,
                            ItemTotal = item.ItemTotal
                        };

                        sql.SaveDataInTransaction("dbo.spBuyingTransactionsItems_Insert", buyingTransactionItem);

                        UpdateQuantitiesOnBuying(buyingTransactionItem, sql);
                    }

                    sql.CommitTransaction();
                }
                catch
                {
                    sql.RollBackTransaction();
                    throw;
                }
            }

        }

        public void UpdateQuantitiesOnBuying(BuyingTransactionItemDBModel _item, SqlDataAccess _sql)
        {
            List<ItemStockDBModel> itemStocks = _sql.LoadDataInTransaction<ItemStockDBModel, dynamic>("dbo.spItemQuantitiesExpiryDates_Select",
                new { _item.ItemId });
            for (int i = 0; i < itemStocks.Count; i++)
            {
                if(itemStocks[i].ItemExpiryDate == _item.ItemExpiryDate)
                {
                    itemStocks[i].ItemQuantity += _item.BuyingTransactionItemQuantity;
                    _sql.SaveDataInTransaction("dbo.spItemQuantityExpire_Update", itemStocks[i]);
                    return;
                }
            }

            ItemStockDBModel newItemStockAndExpiryDate = new ItemStockDBModel
            {
                ItemId = _item.ItemId,
                ItemExpiryDate = _item.ItemExpiryDate,
                ItemQuantity = _item.BuyingTransactionItemQuantity
            };
            _sql.SaveDataInTransaction("dbo.spItemQuantitiesExpiryDates_InsertOnBuying", newItemStockAndExpiryDate);
        }
    }
}
