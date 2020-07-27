CREATE TABLE [dbo].[UserHourRate]
(
	[UserId] NVARCHAR(128) NOT NULL, 
    [UserHourRate] DECIMAL(18, 3) NULL, 
    CONSTRAINT [FK_UserHourRate_User] FOREIGN KEY ([UserId]) REFERENCES [User]([Id]) 
)
