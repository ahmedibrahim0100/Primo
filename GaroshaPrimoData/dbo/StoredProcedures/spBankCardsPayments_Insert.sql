CREATE PROCEDURE [dbo].[spBankCardsPayments_Insert]
	@Id INT output, 
    @SellingTransactionId INT,
	@Amount MONEY,
	@CardNumber NVARCHAR(100)
	AS
Begin
	set nocount on;
	insert into dbo.BankCardsPayments(SellingTransactionId, Amount, CardNumber) 
	values(@SellingTransactionId, @Amount, @CardNumber);
	select @Id = SCOPE_IDENTITY();
End
	
