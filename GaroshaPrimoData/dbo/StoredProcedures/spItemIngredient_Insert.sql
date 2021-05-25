CREATE PROCEDURE [dbo].[spItemIngredient_Insert]
	@ItemId INT,
	@IngredientId INT
AS
	BEGIN
	SET NOCOUNT ON;
	INSERT INTO dbo.ItemIngredients (ItemId, IngredientId)
	VALUES (@ItemId, @IngredientId);
	END