CREATE TABLE [dbo].[BuyingTransactionsItems]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [BuyingTransactionId] INT NOT NULL, 
    [ItemId] INT NOT NULL, 
    [ItemExpiryDate] DATE NULL, 
    [BuyingTransactionItemQuantity] DECIMAL(18, 3) NULL DEFAULT 1, 
    [ItemSellingPrice] MONEY NULL, 
	[ItemBuyingDiscountPercentage] DECIMAL(6, 3),
	[ItemBuyingPrice] MONEY,
	[ItemSubtotal] MONEY NULL,
    [ItemBuyingTaxesPercentage] DECIMAL(6, 3) NULL, 
    [ItemBuyingTaxesValue] MONEY NULL, 
    [ItemTotal] MONEY NULL, 
    CONSTRAINT [FK_BuyingTransactionsItems_BuyingTransactionsMaster] FOREIGN KEY ([BuyingTransactionId]) REFERENCES [BuyingTransactionsMaster]([TransactionId]), 
    CONSTRAINT [FK_BuyingTransactionsItems_ItemsMaster] FOREIGN KEY ([ItemId]) REFERENCES [ItemsMaster]([ItemId])
)
