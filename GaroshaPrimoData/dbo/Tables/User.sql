CREATE TABLE [dbo].[User]
(
    [Id] NVARCHAR(128) PRIMARY KEY NOT NULL, 
    [Name] NVARCHAR(200) NULL, 
    [Email] NVARCHAR(256) NULL, 
    [HourRate] DECIMAL(18, 3) NULL, 
    [Status] NVARCHAR(10) NULL, 
    [CreatedDate] DATETIME2 NULL DEFAULT getdate() 
)
