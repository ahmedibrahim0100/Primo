CREATE TABLE [dbo].[Customers]
(
	[CustomerId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [CustomerName] NVARCHAR(200) NULL, 
    [CustomerEmail] NVARCHAR(256) NULL, 
    [CustomerMedicalHistory] NVARCHAR(MAX) NULL, 
    [CustomerNotes] NVARCHAR(MAX) NULL, 
    [CustomerStatus] NVARCHAR(10) NULL
)
