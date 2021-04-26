CREATE PROCEDURE [dbo].[spItemQuantityAndExpireDate_Delete]
	@ItemId int,
	@ItemExpiryDate date
AS
Begin
	set nocount on;
	delete from dbo.ItemsQuantitiesExpiryDates 
	where ItemId=@ItemId and ItemExpiryDate=@ItemExpiryDate;
End