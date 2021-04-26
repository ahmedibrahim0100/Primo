CREATE TABLE [dbo].[CashPayments]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [SellingTransactionId] INT,
	[Amount] MONEY,
    CONSTRAINT [FK_CashPayments_SellingTransactionsMaster] FOREIGN KEY ([SellingTransactionId]) REFERENCES [SellingTransactionsMaster]([TransactionId])
)

