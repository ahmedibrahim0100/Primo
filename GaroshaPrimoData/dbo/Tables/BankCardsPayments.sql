CREATE TABLE [dbo].[BankCardsPayments]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [SellingTransactionId] INT,
	[Amount] MONEY,
	[CardNumber] NVARCHAR(100),
    CONSTRAINT [FK_BankCardsPayments_SellingTransactionsMaster] FOREIGN KEY ([SellingTransactionId]) REFERENCES [SellingTransactionsMaster]([TransactionId])

)
