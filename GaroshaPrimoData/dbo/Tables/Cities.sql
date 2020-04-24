CREATE TABLE [dbo].[Cities]
(
	[CityId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [CityName] NVARCHAR(60) NULL, 
    [CountryId] INT NULL, 
    CONSTRAINT [FK_Cities_Countries] FOREIGN KEY ([CountryId]) REFERENCES [Countries]([CountryId])
)
