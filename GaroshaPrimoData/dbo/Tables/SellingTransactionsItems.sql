CREATE TABLE [dbo].[SellingTransactionsItems]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [SellingTransactionId] INT NOT NULL, 
    [ItemId] INT NOT NULL, 
    [ItemExpiryDate] DATE NULL, 
    [SellingTransactionItemQuantity] DECIMAL(18, 3) NULL DEFAULT 1, 
    [ItemSellingPrice] MONEY NULL, 
	[ItemSubtotal] MONEY NULL,
    [ItemSellingDiscountPercentage] DECIMAL(6, 3) NULL, 
    [ItemSellingDiscountValue] MONEY NULL, 
	[ItemSellingTaxesPercentage] Decimal (6, 3) NULL,
    [ItemSellingTaxesValue] MONEY NULL DEFAULT 0, 
    [ItemTotal] MONEY NULL, 
    [ItemCostOnSelling] MONEY NULL, 
    CONSTRAINT [FK_SellingTransactionsItems_SellingTransactionsMaster] FOREIGN KEY ([SellingTransactionId]) REFERENCES [SellingTransactionsMaster]([TransactionId]), 
    CONSTRAINT [FK_SellingTransactionsItems_ItemsMaster] FOREIGN KEY ([ItemId]) REFERENCES [ItemsMaster]([ItemId])
)
