CREATE TABLE [dbo].[SellingTransactionsMaster]
(
	[TransactionId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [SellingTransactionTypeId] INT NULL, 
    [TransactionTiming] DATETIME2 NULL DEFAULT getdate(), 
    [Subtotal] MONEY NULL, 
    [Taxes] MONEY NULL, 
    [Total] MONEY NULL, 
    [SellerId] NVARCHAR(128) NULL, 
	[ShiftOwnerId] NVARCHAR(128) NULL,
    [CustomerId] INT NULL, 
    [NumberOfItems] INT NULL, 
    [NumberOfPieces] DECIMAL(18, 3) NULL, 
    CONSTRAINT [FK_SellingTransactionsMaster_User] FOREIGN KEY ([SellerId]) REFERENCES [User]([Id]), 
    CONSTRAINT [FK_SellingTransactionsMaster_Customers] FOREIGN KEY ([CustomerId]) REFERENCES [Customers]([CustomerId]), 
    CONSTRAINT [FK_SellingTransactionsMaster_SellingTransactionType] FOREIGN KEY ([SellingTransactionTypeId]) REFERENCES [SellingTransactionType]([Id]), 
    CONSTRAINT [FK_2_SellingTransactionsMaster_User] FOREIGN KEY ([ShiftOwnerId]) REFERENCES [User]([Id])   
)
