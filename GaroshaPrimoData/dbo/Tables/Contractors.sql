
CREATE TABLE [dbo].[Contractors]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [ContractorName] NVARCHAR(200) NULL, 
    [CreditLimit] MONEY,
    [Status] NVARCHAR(10) NULL
)
