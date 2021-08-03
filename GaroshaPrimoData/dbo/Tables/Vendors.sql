CREATE TABLE [dbo].[Vendors]
(
	[VendorId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [VendorName] NVARCHAR(200) NULL, 
	[VendorBalance] DECIMAL(6,3),
    [VendorStatus] NVARCHAR(10) NULL
)
