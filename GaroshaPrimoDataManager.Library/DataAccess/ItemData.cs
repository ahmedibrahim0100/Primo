using GaroshaPrimoDataManager.Library.Internal.DataAccess;
using GaroshaPrimoDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GaroshaPrimoDataManager.Library.DataAccess
{
    public class ItemData
    {
        public List<ItemModel> GetAllItems()
        {
            SqlDataAccess sql = new SqlDataAccess();
            var output = sql.LoadData<ItemModel, dynamic>("dbo.spItems_GetAll", new { }, "GaroshaPrimoData");
            return output;
        }

        public List<ItemModel> GetItemsByIdentifier(string identifier)
        {
            SqlDataAccess sql = new SqlDataAccess();
            var p = new { identifier = identifier };
            var output = sql.LoadData<ItemModel, dynamic>("dbo.spItems_SearchByIdentifier", p, "GaroshaPrimoData");

            return output;
        }


        public void SaveNewItem(NewItemModel newItem)
        {
            ItemMasterDBModel item = new ItemMasterDBModel
            {
                ItemNameEnglish = newItem.ItemNameEnglish,
                ItemOtherName = newItem.ItemOtherName,
                ProducerCompanyId = newItem.ProducerCompanyId,
                ItemSellingPrice = newItem.ItemSellingPrice,
                ItemBuyingDiscountPercentage = newItem.ItemBuyingDiscountPercentage,
                ItemBuyingPrice = newItem.ItemBuyingPrice,
                TaxesPercentageOnBuying = newItem.TaxesPercentageOnBuying,
                TaxesValueOnBuying = newItem.TaxesValueOnBuying,
                TaxesPercentageOnSelling = newItem.TaxesPercentageOnSelling,
                TaxesValueOnSelling = newItem.TaxesValueOnSelling,
                ItemDescription = newItem.ItemDescription,
                CreatedDate = DateTime.Now,
                LastModified = DateTime.Now,
                ItemStatus = "active"
            };

            using (SqlDataAccess sql = new SqlDataAccess())
            {
                try
                {
                    sql.StartTransaction("GaroshaPrimoData");

                    //save item master data
                    sql.SaveDataInTransaction("dbo.spItemMaster_Insert", item);

                    //get the new item's id
                    item.ItemId = sql.LoadDataInTransaction<int, dynamic>("dbo.spItemMaster_GetItemId",
                        null).FirstOrDefault();

                    if(newItem.ItemCodes.Length > 0)
                    {
                        for (int i = 0; i < newItem.ItemCodes.Length; i++)
                        {
                            ItemCodeDBModel itemCode = new ItemCodeDBModel
                            {
                                ItemId = item.ItemId,
                                ItemCode = newItem.ItemCodes[i]
                            };

                            sql.SaveDataInTransaction("dbo.spItemCode_Insert", itemCode);
                        }
                    }

                    if (newItem.TherapeuticClassesIds.Length > 0)
                    {
                        for (int x = 0; x < newItem.TherapeuticClassesIds.Length; x++)
                        {
                            ItemTherapeuticClassDBModel itemTherapeuticClass = new ItemTherapeuticClassDBModel
                            {
                                ItemId = item.ItemId,
                                TherapeuticClassId = newItem.TherapeuticClassesIds[x]
                            };

                            sql.SaveDataInTransaction("dbo.spItemTherapeuticClass_Insert", itemTherapeuticClass);
                        }
                    }

                    if (newItem.IngredientsIds.Length > 0)
                    {
                        for (int z = 0; z < newItem.IngredientsIds.Length; z++)
                        {
                            ItemIngredientDBModel itemIngredient = new ItemIngredientDBModel
                            {
                                ItemId = item.ItemId,
                                IngredientId = newItem.IngredientsIds[z]
                            };

                            sql.SaveDataInTransaction("dbo.spItemIngredient_Insert", itemIngredient);
                        }
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

        public ItemMasterDBModel GetItemByEnglishName(string englishName)
        {
            SqlDataAccess sql = new SqlDataAccess();
            var p = new { identifier = englishName };
            var output = sql.LoadData<ItemMasterDBModel, dynamic>("dbo.spItems_SearchByEnglishName", p, "GaroshaPrimoData").FirstOrDefault();

            return output;
        }

        public ItemMasterDBModel GetItemByOtherName(string otherName)
        {
            SqlDataAccess sql = new SqlDataAccess();
            var p = new { identifier = otherName };
            var output = sql.LoadData<ItemMasterDBModel, dynamic>("dbo.spItems_SearchByOtherName", p, "GaroshaPrimoData").FirstOrDefault();

            return output;
        }

        public ItemMasterDBModel GetItemByCode(string code)
        {
            SqlDataAccess sql = new SqlDataAccess();
            var p = new { identifier = code };
            var output = sql.LoadData<ItemMasterDBModel, dynamic>("dbo.spItems_SearchByCode", p, "GaroshaPrimoData").FirstOrDefault();

            return output;
        }

        public Object VerifyNewItem(NewItemVerificationModel item)
        {
            ItemData data = new ItemData();
            ItemMasterDBModel itemOfSimilar_EnglishName;
            ItemMasterDBModel itemOfSimilar_OtherName;
            List<ItemMasterDBModel> itemsOfSimilar_Code = new List<ItemMasterDBModel>();
            bool itemDataVerified = true;
            

            if (item.ItemNameEnglish != null)
            {
                itemOfSimilar_EnglishName = GetItemByEnglishName(item.ItemNameEnglish);
                if(itemOfSimilar_EnglishName != null)
                {
                    var result = new KeyValuePair<string, ItemMasterDBModel>(nameof(item.ItemNameEnglish), itemOfSimilar_EnglishName);
                    return result;
                }
            }

            if(item.ItemOtherName != null)
            {
                itemOfSimilar_OtherName = GetItemByOtherName(item.ItemOtherName);
                if (itemOfSimilar_OtherName != null)
                {
                    var result = new KeyValuePair<string, ItemMasterDBModel>(nameof(item.ItemNameEnglish), itemOfSimilar_OtherName);
                    return result;
                }
            }

            if(item.ItemCodes.Length > 0)
            {
                for (int i = 0; i < item.ItemCodes.Length; i++)
                {
                    ItemMasterDBModel itemOfSimilar_Code = GetItemByCode(item.ItemCodes[i]);
                    if(itemOfSimilar_Code != null)
                    {
                        var output = new
                        {
                            repeatedItem = itemOfSimilar_Code,
                            repeatedCode = item.ItemCodes[i]
                        };

                        var result = new KeyValuePair<string, dynamic>(nameof(item.ItemCodes), output);
                        return result;
                    }
                }

            }


            return itemDataVerified;
        }
    }
}
