CREATE PROCEDURE [dbo].[spItemQuantities_Delete]
	@ItemId int
AS
Begin
	set nocount on;
	delete from dbo.ItemsQuantitiesExpiryDates
	where ItemId=@ItemId;
End
	