CREATE PROCEDURE [dbo].[spItemCode_Insert]
	@ItemId INT,
	@ItemCode NVARCHAR(200)
AS
	BEGIN
	SET NOCOUNT ON;
	INSERT INTO dbo.ItemsCodes (ItemId, ItemCode)
	VALUES (@ItemId, @ItemCode);
	END