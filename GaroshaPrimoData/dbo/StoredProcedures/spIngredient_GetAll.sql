CREATE PROCEDURE [dbo].[spIngredient_GetAll]
	AS
Begin
	set nocount on;
	SELECT * from Ingredient
End