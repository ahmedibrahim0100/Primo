CREATE PROCEDURE [dbo].[spCashPayments_Insert]
	@Id INT output, 
    @SellingTransactionId INT,
	@Amount MONEY
AS
Begin
	set nocount on;
	insert into dbo.CashPayments(SellingTransactionId, Amount) 
	values(@SellingTransactionId, @Amount);
	select @Id = SCOPE_IDENTITY();
End
	