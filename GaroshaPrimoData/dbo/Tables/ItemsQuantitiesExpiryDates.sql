CREATE TABLE [dbo].[ItemsQuantitiesExpiryDates]
(
	[ItemId] INT NOT NULL, 
    [ItemExpiryDate] DATE NULL, 
    [ItemQuantity] DECIMAL(18, 3) NULL, 
    CONSTRAINT [FK_ItemsQuantitiesExpiryDates_ItemsMaster] FOREIGN KEY ([ItemId]) REFERENCES [ItemsMaster]([ItemId]) 
)
