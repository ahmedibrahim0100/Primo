CREATE PROCEDURE [dbo].[spItemQuantityExpire_Insert]
	@ItemId int,
	@SubstractOfQtyFromStock decimal(10,3)
AS
Begin
	set nocount on;
	insert into dbo.ItemsQuantitiesExpiryDates (ItemId, ItemQuantity)
	values (@ItemId, @SubstractOfQtyFromStock);
End
