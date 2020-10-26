CREATE TABLE [dbo].[ItemsMaster]
(
	[ItemId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [ItemNameEnglish] NVARCHAR(200) NULL, 
    [ItemOtherName] NVARCHAR(200) NULL, 
    [ProducerCompanyId] INT NULL, 
    [ItemSellingPrice] MONEY NULL, 
    [ItemBuyingDiscountPercentage] DECIMAL(6, 3) NULL DEFAULT 20, 
    [ItemBuyingPrice] MONEY NULL, 
    [TaxesPercentageOnBuying] DECIMAL(6, 3) NULL DEFAULT 0, 
	[TaxesValueOnBuying] MONEY NULL,
	[TaxesPercentageOnSelling] DECIMAL(6, 3) NULL DEFAULT 0,
	[TaxesValueOnSelling] MONEY NULL,
    [ItemDescription] NVARCHAR(MAX) NULL, 
    [CreatedDate] DATETIME2 NULL DEFAULT getdate(), 
    [LastModified] DATETIME2 NULL DEFAULT getdate(), 
    [ItemStatus] NVARCHAR(10) NULL, 
    CONSTRAINT [FK_ItemsMaster_ProducerCompanies] FOREIGN KEY ([ProducerCompanyId]) REFERENCES [ProducerCompanies]([ProducerCompanyId])
)
