using GaroshaPrimoDataManager.Library.Internal.DataAccess;
using GaroshaPrimoDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.DataAccess
{
    public class SellingTransactionData
    {
        /// <summary>
        /// Gets all SellingTransactionTypes : On-site | Delivery | Contract, etc
        /// </summary>
        /// <returns></returns>
        public List<SellingTransactionTypeModel> GetAllSellingTransactionTypes()
        {
            SqlDataAccess sql = new SqlDataAccess();
            var output = sql.LoadData<SellingTransactionTypeModel, dynamic>("dbo.spSellingTransactionType_GetAll", new { }, "GaroshaPrimoData");
            return output;
        }


        /// <summary>
        /// Saves selling transaction to the database
        /// </summary>
        public void SaveSale(SellingTransactionModel saleInfo)
        {
            SellingTransactionMasterDBModel masterSaleData = new SellingTransactionMasterDBModel
            {
                SellingTransactionTypeId = saleInfo.SellingTransactionTypeId,
                TransactionTiming = DateTime.Now,
                Subtotal = saleInfo.Subtotal,
                calculatedTaxesPercentage = saleInfo.CalculatedTaxesPercentage,
                calculatedTaxesValue = saleInfo.CalculatedTaxesValue,
                calculatedDiscountPercentage = saleInfo.CalculatedDiscountPercentage,
                calculatedDiscountValue = saleInfo.CalculatedDiscountValue,
                TaxesPercentageOverInvoice = saleInfo.TaxesPercentageOverInvoice,
                TaxesValueOverInvoice = saleInfo.TaxesValueOverInvoice,
                DiscountPercentageOverInvoice = saleInfo.DiscountPercentageOverInvoice,
                DiscountValueOverInvoice = saleInfo.DiscountValueOverInvoice,
                Total = saleInfo.Total,
                SellerId = saleInfo.SellerId,
                ShiftOwnerId = saleInfo.ShiftOwnerId,
                CustomerId = saleInfo.CustomerId,
                NumberOfItems = saleInfo.NumberOfItems,
                NumberOfPieces = saleInfo.NumberOfPieces
            };

            

            using(SqlDataAccess sql = new SqlDataAccess())
            {
                try
                {
                    sql.StartTransaction("GaroshaPrimoData");

                    //save the sale model
                    sql.SaveDataInTransaction("dbo.spSellingTransactionMaster_Insert", masterSaleData);

                    //get the id of the transaction
                    masterSaleData.TransactionId = sql.LoadDataInTransaction<int, dynamic>("dbo.spSellingTransactionMaster_GetId", 
                        new { masterSaleData.SellerId, masterSaleData.TransactionTiming}).FirstOrDefault();

                   
                    if(saleInfo.InvoicePayment.cash > 0)
                    {
                        CashPaymentDBModel cashPayment = new CashPaymentDBModel
                        {
                            SellingTransactionId = masterSaleData.TransactionId,
                            Amount = saleInfo.InvoicePayment.cash
                        };

                        sql.SaveDataInTransaction("dbo.spCashPayments_Insert", cashPayment);
                    }

                    if(saleInfo.InvoicePayment.bankCardsPayments.Length > 0)
                    {
                        for (int i = 0; i < saleInfo.InvoicePayment.bankCardsPayments.Length; i++)
                        {
                            saleInfo.InvoicePayment.bankCardsPayments[i].SellingTransactionId = masterSaleData.TransactionId;
                            sql.SaveDataInTransaction("dbo.spBankCardsPayments_Insert",
                                saleInfo.InvoicePayment.bankCardsPayments[i]);
                        }                      
                    }

                    if(saleInfo.InvoicePayment.contractorsPayments.Length > 0)
                    {
                        for (int i = 0; i < saleInfo.InvoicePayment.contractorsPayments.Length; i++)
                        {
                            saleInfo.InvoicePayment.contractorsPayments[i].SellingTransactionId = masterSaleData.TransactionId;
                            sql.SaveDataInTransaction("dbo.spContractorsPayments_Insert",
                                saleInfo.InvoicePayment.contractorsPayments[i]);
                        }
                    }

                    foreach (var item in saleInfo.SaleItems)
                    {
                        SellingTransactionItemDBModel saleItem = new SellingTransactionItemDBModel
                        {
                            SellingTransactionId = masterSaleData.TransactionId,
                            ItemId = item.ItemId,
                            ItemExpiryDate = item.ItemExpiryDate,
                            SellingTransactionItemQuantity = item.SellingTransactionItemQuantity,
                            ItemSellingPrice = item.ItemSellingPrice,
                            ItemSubtotal = item.ItemSubtotal,
                            ItemSellingDiscountPercentage = item.ItemSellingDiscountPercentage,
                            ItemSellingDiscountValue = item.ItemSellingDiscountValue,
                            ItemSellingTaxesPercentage = item.ItemSellingTaxesPercentage,
                            ItemSellingTaxesValue = item.ItemSellingTaxesValue,
                            ItemTotal = item.ItemTotal,
                            ItemCostOnSelling = item.ItemCostOnSelling
                        };
                        
                        sql.SaveDataInTransaction("dbo.spSellingTransactionsItems_Insert", saleItem);

                        UpdateQuantitiesOnSelling(item, sql);
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

        public void UpdateQuantitiesOnSelling(SellingTransactionItemModel item, SqlDataAccess sql)
        {
            decimal subtract = item.ItemStock - item.SellingTransactionItemQuantity;

            if (subtract <= 0)
            {
                sql.SaveDataInTransaction("dbo.spItemQuantities_Delete", item.ItemId);
                sql.SaveDataInTransaction("dbo.spItemQuantityExpire_Insert",
                    new { item.ItemId, subtract });
            }
            else if (subtract > 0)
            {
                List<ItemStockDBModel> itemStocks = 
                sql.LoadDataInTransaction<ItemStockDBModel, dynamic>("dbo.spItemQuantitiesExpiryDates_Select", 
                new { item.ItemId });

                decimal subtract_QtyFromStockExpire = 0;

                for (int x = 0; x < itemStocks.Count; x++)
                {
                    if(x == 0)
                    {
                        subtract_QtyFromStockExpire = itemStocks[x].ItemQuantity - item.SellingTransactionItemQuantity;
                    }
                    else
                    {
                        subtract_QtyFromStockExpire = itemStocks[x].ItemQuantity - (0 - subtract_QtyFromStockExpire);
                    }

                    if(subtract_QtyFromStockExpire > 0)
                    {
                        sql.SaveDataInTransaction("dbo.spItemQuantityExpire_Update", itemStocks[x]);
                        break;
                    }
                    else if(subtract_QtyFromStockExpire == 0)
                    {
                        sql.SaveDataInTransaction("dbo.spItemQuantityAndExpireDate_Delete",
                            new { itemStocks[x].ItemId, itemStocks[x].ItemExpiryDate });
                        break;
                    }
                    else if(subtract_QtyFromStockExpire < 0)
                    {
                        sql.SaveDataInTransaction("dbo.spItemQuantityAndExpireDate_Delete",
                            new { itemStocks[x].ItemId, itemStocks[x].ItemExpiryDate });
                    }
                }
            }

        }

        //public void UpdateItemsQuantities()
        //{
        //    for (int i = 0; i < dgvTransaction.Rows.Count; i++)
        //    {
        //        decimal qty_entered = Convert.ToDecimal(dgvTransaction.Rows[i].Cells[3].Value);
        //        decimal stk = Convert.ToDecimal(dgvTransaction.Rows[i].Cells[5].Value);
        //        decimal subtract = stk - qty_entered;
        //        if (subtract < 0)
        //        {
        //            Cls.DeleteFromtb_QtyEx(Convert.ToInt32(dgvTransaction.Rows[i].Cells[0].Value));
        //            Cls.InsertTotb_QtyEx(Convert.ToInt32(dgvTransaction.Rows[i].Cells[0].Value), subtract);
        //        }
        //        else if (subtract == 0)
        //        {
        //            Cls.DeleteFromtb_QtyEx(Convert.ToInt32(dgvTransaction.Rows[i].Cells[0].Value));
        //            Cls.InsertTotb_QtyEx(Convert.ToInt32(dgvTransaction.Rows[i].Cells[0].Value), subtract);

        //        }
        //        else if (subtract > 0)
        //        {
        //            DataTable dt_QtyEx = new DataTable();
        //            dt_QtyEx = Cls.SelectFromtb_QtyEx(Convert.ToInt32(dgvTransaction.Rows[i].Cells[0].Value));
        //            decimal subtract_QtyFromStock_Ex = 0;
        //            //decimal qty = Convert.ToDecimal(dataGridView1.Rows[i].Cells[3].Value);

        //            for (int x = 0; x < dt_QtyEx.Rows.Count; x++)
        //            {
        //                if (x == 0)
        //                {
        //                    subtract_QtyFromStock_Ex = Convert.ToDecimal(dt_QtyEx.Rows[x][2]) - qty_entered;

        //                }
        //                else
        //                {
        //                    subtract_QtyFromStock_Ex = Convert.ToDecimal(dt_QtyEx.Rows[x][2]) - (0 - subtract_QtyFromStock_Ex);

        //                }
        //                if (subtract_QtyFromStock_Ex > 0)
        //                {
        //                    Cls.Updatetb_QtyEx(Convert.ToInt32(dt_QtyEx.Rows[x][0]), Convert.ToDateTime(dt_QtyEx.Rows[x][1]), subtract_QtyFromStock_Ex);

        //                    break;
        //                }
        //                else if (subtract_QtyFromStock_Ex == 0)
        //                {
        //                    Cls.DeleteFromtb_QtyEx_Expire(Convert.ToInt32(dt_QtyEx.Rows[x][0]), Convert.ToDateTime(dt_QtyEx.Rows[x][1]));

        //                    break;
        //                }
        //                else if (subtract_QtyFromStock_Ex < 0)
        //                {
        //                    Cls.DeleteFromtb_QtyEx_Expire(Convert.ToInt32(dt_QtyEx.Rows[x][0]), Convert.ToDateTime(dt_QtyEx.Rows[x][1]));

        //                }

        //            }
        //        }
        //    }

        //}
    }
}
