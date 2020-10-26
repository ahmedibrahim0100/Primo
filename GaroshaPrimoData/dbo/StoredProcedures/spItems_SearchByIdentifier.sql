CREATE PROCEDURE [dbo].[spItems_SearchByIdentifier]
@identifier varchar(200)
as
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

from 
(ItemsMaster
Inner join ItemsQuantitiesExpiryDates
on ItemsMaster.ItemId=ItemsQuantitiesExpiryDates.ItemId
left join ItemsCodes
on ItemsMaster.ItemId=ItemsCodes.ItemId)

where 
ItemsCodes.ItemCode=@identifier
or ItemsMaster.ItemNameEnglish Like '%'+@identifier+'%'
or ItemsMaster.ItemOtherName Like '%'+@identifier+'%'
or ItemsMaster.ItemId = dbo.TryConvertToInt(@identifier)

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

