CREATE PROCEDURE [dbo].[spItemQuantitiesExpiryDates_Select]
	@ItemId int
AS
Begin 
	set nocount on;
	select * from dbo.ItemsQuantitiesExpiryDates 
	where ItemId=@ItemId 
	order by ItemExpiryDate asc; 
End
	