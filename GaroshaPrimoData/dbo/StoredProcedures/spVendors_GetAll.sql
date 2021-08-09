CREATE PROCEDURE [dbo].[spVendors_GetAll]

AS
Begin
	set nocount on;
	SELECT * from dbo.Vendors;
End

