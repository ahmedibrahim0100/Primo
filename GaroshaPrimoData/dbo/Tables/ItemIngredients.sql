CREATE TABLE [dbo].[ItemIngredients]
(
	[ItemId] INT,
	[IngredientId] INT,
	CONSTRAINT [FK_ItemIngredients_ItemsMaster] FOREIGN KEY ([ItemId]) REFERENCES [ItemsMaster]([ItemId]),
	CONSTRAINT [FK_ItemIngredients_Ingredient] FOREIGN KEY ([IngredientId]) REFERENCES [Ingredient]([Id])
)
