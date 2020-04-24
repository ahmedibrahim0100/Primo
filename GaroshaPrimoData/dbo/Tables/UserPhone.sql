CREATE TABLE [dbo].[UserPhone]
(
	[UserId] NVARCHAR(128) NOT NULL, 
    [PhoneNumber] NVARCHAR(30) NULL, 
    CONSTRAINT [FK_UserPhone_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id])

)
