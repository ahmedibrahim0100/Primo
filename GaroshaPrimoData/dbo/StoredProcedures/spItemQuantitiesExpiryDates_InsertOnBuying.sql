CREATE PROCEDURE [dbo].[spItemQuantitiesExpiryDates_InsertOnBuying]
	@ItemId int,
	@ItemExpiryDate date,
	@ItemQuantity decimal
	AS
Begin
	set nocount on;
	insert into dbo.ItemsQuantitiesExpiryDates (ItemId, ItemExpiryDate, ItemQuantity)
	values(@ItemId, @ItemExpiryDate, @ItemQuantity);
End