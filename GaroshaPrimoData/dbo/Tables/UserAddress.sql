CREATE TABLE [dbo].[UserAddress]
(
	[UserId] NVARCHAR(128) NOT NULL , 
    [Address] NVARCHAR(300) NULL, 
    [CityId] INT NULL, 
    [CountryId] INT NULL, 
    CONSTRAINT [FK_UserAddress_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id]), 
    CONSTRAINT [FK_UserAddress_Cities] FOREIGN KEY ([CityId]) REFERENCES [Cities]([CityId]), 
    CONSTRAINT [FK_UserAddress_Countries] FOREIGN KEY ([CountryId]) REFERENCES [Countries]([CountryId])
)
