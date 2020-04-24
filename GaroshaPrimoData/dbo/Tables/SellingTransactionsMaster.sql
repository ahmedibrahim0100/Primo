CREATE TABLE [dbo].[SellingTransactionsMaster]
(
	[TransactionId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [TransactionType] NVARCHAR(50) NULL, 
    [TransactionTiming] DATETIME2 NULL DEFAULT getdate(), 
    [Subtotal] MONEY NULL, 
    [Taxes] MONEY NULL, 
    [Total] MONEY NULL, 
    [CashierId] NVARCHAR(128) NULL, 
    [CustomerId] INT NULL, 
    [NumberOfItems] INT NULL, 
    [NumberOfPieces] DECIMAL(18, 3) NULL, 
    CONSTRAINT [FK_SellingTransactionsMaster_User] FOREIGN KEY ([CashierId]) REFERENCES [User]([Id]), 
    CONSTRAINT [FK_SellingTransactionsMaster_Customers] FOREIGN KEY ([CustomerId]) REFERENCES [Customers]([CustomerId])
)
