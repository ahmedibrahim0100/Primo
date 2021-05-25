CREATE TABLE [dbo].[IngredientPharmacologicalClass]
(
	[IngredientId] INT,
	[PharmacologicalClassId] INT,
	CONSTRAINT [FK_IngredientPharmacologicalClass_Ingredient] FOREIGN KEY ([IngredientId]) REFERENCES [Ingredient]([Id]),
	CONSTRAINT [FK_IngredientPharmacologicalClass_PharmacologicalClass] FOREIGN KEY ([PharmacologicalClassId]) REFERENCES [PharmacologicalClass]([Id])

)
