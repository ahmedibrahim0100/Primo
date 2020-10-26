CREATE PROCEDURE [dbo].[spCustomers_SearchByIdentifier]
	@identifier varchar(200)
AS
Begin
set nocount on;
	SELECT 
	Customers.CustomerId,
	Customers.CustomerName,
	Customers.CustomerEmail,
	Customers.CustomerMedicalHistory,
	Customers.CustomerNotes,
	Customers.CustomerStatus

	from
	(Customers
	Left join CustomerPhone
	on Customers.CustomerId = CustomerPhone.CustomerId)

	where
	Customers.CustomerName Like '%'+@identifier+'%'
	or Customers.CustomerEmail Like '%'+@identifier+'%'
	or CustomerPhone.PhoneNumber Like '%'+@identifier+'%'
	or Customers.CustomerId = dbo.TryConvertToInt(@identifier)

	Group by
	Customers.CustomerId,
	Customers.CustomerName,
	Customers.CustomerEmail,
	Customers.CustomerMedicalHistory,
	Customers.CustomerNotes,
	Customers.CustomerStatus

End
