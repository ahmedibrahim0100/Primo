CREATE PROCEDURE [dbo].[spItemMaster_GetItemId]
	
AS
BEGIN
	SET NOCOUNT ON;
	SELECT MAX(ItemId) FROM dbo.ItemsMaster;
END
