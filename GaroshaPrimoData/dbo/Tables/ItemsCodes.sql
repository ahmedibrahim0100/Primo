CREATE TABLE [dbo].[ItemsCodes]
(
	[ItemId] INT NOT NULL, 
    [ItemCode] NVARCHAR(200) NULL, 
    CONSTRAINT [FK_ItemsCodes_ItemsMaster] FOREIGN KEY ([ItemId]) REFERENCES [ItemsMaster]([ItemId]) 
)
