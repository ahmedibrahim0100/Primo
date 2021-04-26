CREATE PROCEDURE [dbo].[spSellingTransactionMaster_GetId]
	@SellerId nvarchar(128),
	@TransactionTiming datetime2
AS
Begin
	set nocount on;
	SELECT TransactionId from dbo.SellingTransactionsMaster where
	SellerId = @SellerId and TransactionTiming = @TransactionTiming;
End