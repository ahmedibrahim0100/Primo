CREATE TABLE [dbo].[CustomerPhone]
(
	[CustomerId] INT NOT NULL, 
    [PhoneNumber] NVARCHAR(30) NULL, 
	[Status] NVARCHAR(10) NULL,
    CONSTRAINT [FK_CustomerPhone_Customers] FOREIGN KEY ([CustomerId]) REFERENCES [Customers]([CustomerId])
)
