CREATE PROCEDURE [dbo].[spItems_GetAll]
	
AS
Begin
set nocount on;
select 
ItemsMaster.ItemId,
ItemsMaster.ItemNameEnglish,
ItemsMaster.ItemOtherName,
min(ItemsQuantitiesExpiryDates.ItemExpiryDate) as 'ExpiryDate',
sum(ItemsQuantitiesExpiryDates.ItemQuantity) as 'Stock',
ItemsMaster.ItemSellingPrice,
ItemsMaster.ProducerCompanyId,
ItemsMaster.ItemBuyingDiscountPercentage,
ItemsMaster.ItemBuyingPrice,
ItemsMaster.TaxesPercentageOnBuying,
ItemsMaster.TaxesValueOnBuying,
ItemsMaster.TaxesPercentageOnSelling,
ItemsMaster.TaxesValueOnSelling,
ItemsMaster.ItemDescription,
ItemsMaster.CreatedDate,
ItemsMaster.LastModified,
ItemsMaster.ItemStatus

from (ItemsMaster
Inner join ItemsQuantitiesExpiryDates
on ItemsMaster.ItemId=ItemsQuantitiesExpiryDates.ItemId
left join ItemsCodes
on ItemsMaster.ItemId=ItemsCodes.ItemId)

Group by 
ItemsMaster.ItemId,
ItemsMaster.ItemNameEnglish,
ItemsMaster.ItemSellingPrice,
ItemsMaster.ItemOtherName,
ItemsMaster.ProducerCompanyId,
ItemsMaster.ItemBuyingDiscountPercentage,
ItemsMaster.ItemBuyingPrice,
ItemsMaster.TaxesPercentageOnBuying,
ItemsMaster.TaxesValueOnBuying,
ItemsMaster.TaxesPercentageOnSelling,
ItemsMaster.TaxesValueOnSelling,
ItemsMaster.ItemDescription,
ItemsMaster.CreatedDate,
ItemsMaster.LastModified,
ItemsMaster.ItemStatus;
	
End
--SELECT * from dbo.ItemsMaster;
	--SELECT 
	--ItemsMaster.ItemId,
 --        ItemsMaster.ItemNameEnglish,
 --        ItemsMaster.ItemOtherName,
 --       ItemsMaster.ProducerCompanyId,
 --       ItemsMaster.ItemSellingPrice,
 --       ItemsMaster.ItemBuyingDiscountPercentage,
 --        ItemsMaster.ItemBuyingPrice,
 --      ItemsMaster.TaxesPercentageOnBuying,
 --     ItemsMaster.ItemDescription,
 --      ItemsMaster.CreatedDate,
 --        ItemsMaster.LastModified,
 --       ItemsMaster.ItemStatus

 --      --ItemExpiryDate,
 --      -- ItemQuantity

	--	from
	--	dbo.ItemsMaster

