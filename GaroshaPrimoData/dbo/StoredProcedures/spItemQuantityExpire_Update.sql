CREATE PROCEDURE [dbo].[spItemQuantityExpire_Update]
	@ItemId int,
	@ItemExpiryDate date,
	@ItemQuantity decimal(10,3)
AS
Begin
	set nocount on;
	update dbo.ItemsQuantitiesExpiryDates set ItemQuantity=@ItemQuantity
	where
	ItemId=@ItemId and ItemExpiryDate=@ItemExpiryDate;
End