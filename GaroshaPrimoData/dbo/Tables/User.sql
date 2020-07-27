CREATE TABLE [dbo].[User]
(
    [Id] NVARCHAR(128) PRIMARY KEY NOT NULL, 
    [Name] NVARCHAR(200) NULL, 
    [Email] NVARCHAR(256) NULL, 
    [CreatedDate] DATETIME2 NULL DEFAULT getdate(), 
	[Status] NVARCHAR(10) NULL

)
