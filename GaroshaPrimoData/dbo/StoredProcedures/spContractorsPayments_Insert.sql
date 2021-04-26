CREATE PROCEDURE [dbo].[spContractorsPayments_Insert]
	@Id INT output, 
    @SellingTransactionId INT,
	@Amount MONEY,
	@ContractorId INT
AS
Begin
	set nocount on;
	insert into dbo.ContractorsPayments(SellingTransactionId, Amount, ContractorId) 
	values(@SellingTransactionId, @Amount, @ContractorId);
	select @Id = SCOPE_IDENTITY();
End
	
