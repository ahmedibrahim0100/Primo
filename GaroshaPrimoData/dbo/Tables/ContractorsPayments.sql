CREATE TABLE [dbo].[ContractorsPayments]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [SellingTransactionId] INT,
	[Amount] MONEY,
	[ContractorId] INT,
    CONSTRAINT [FK_ContractorsPayments_SellingTransactionsMaster] FOREIGN KEY ([SellingTransactionId]) REFERENCES [SellingTransactionsMaster]([TransactionId]),
	CONSTRAINT [FK_ContractorsPayments_Contractors] FOREIGN KEY ([ContractorId]) REFERENCES [Contractors]([Id])
)
