CREATE TABLE [dbo].[ProducerCompanies]
(
	[ProducerCompanyId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [ProducerCompanyName] NVARCHAR(200) NULL, 
    [ProducerCompanyStatus] NVARCHAR(10) NULL
)
