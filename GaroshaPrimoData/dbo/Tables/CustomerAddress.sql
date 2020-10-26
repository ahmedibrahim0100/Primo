CREATE TABLE [dbo].[CustomerAddress]
(
	[CustomerId] INT NOT NULL, 
    [Address] NVARCHAR(300) NULL, 
    [CityId] INT NULL, 
    [CountryId] INT NULL, 
	[Status] NVARCHAR(10) NULL,
    CONSTRAINT [FK_CustomerAddress_Customers] FOREIGN KEY ([CustomerId]) REFERENCES [Customers]([CustomerId]), 
    CONSTRAINT [FK_CustomerAddress_Cities] FOREIGN KEY ([CityId]) REFERENCES [Cities]([CityId]), 
    CONSTRAINT [FK_CustomerAddress_Countries] FOREIGN KEY ([CountryId]) REFERENCES [Countries]([CountryId])
)
