CREATE TABLE [dbo].[BuyingTransactionsMaster]
(
	[TransactionId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [TransactionTiming] DATETIME2 NULL DEFAULT getdate(), 
    [Subtotal] MONEY NULL,
	[CalculatedTaxesPercentage] DECIMAL (6, 3) NULL, 
    [CalculatedTaxesValue] MONEY NULL, 
	[CalculatedRetailDiscountPercentage] DECIMAL (6, 3) NULL,
	[CalculatedRetailDiscountValue] MONEY NULL,
	[TaxesPercentageOverInvoice] DECIMAL (6, 3) NULL,
	[TaxesValueOverInvoice] MONEY NULL,
	[RetailDiscountPercentageOverInvoice] DECIMAL (6, 3) NULL,
	[RetailDiscountValueOverInvoice] MONEY NULL,
    [Total] MONEY NULL, 
    [UserId] NVARCHAR(128) NULL, 
	[ShiftOwnerId] NVARCHAR(128) NULL,
    [VendorId] INT NULL, 
    [NumberOfItems] INT NULL, 
    [NumberOfPieces] DECIMAL(18, 3) NULL, 
    CONSTRAINT [FK_BuyingTransactionsMaster_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id]), 
    CONSTRAINT [FK_BuyingTransactionsMaster_Vendors] FOREIGN KEY ([VendorId]) REFERENCES [Vendors]([VendorId]), 
    CONSTRAINT [FK_2_BuyingTransactionsMaster_User] FOREIGN KEY ([ShiftOwnerId]) REFERENCES [User]([Id])
)
