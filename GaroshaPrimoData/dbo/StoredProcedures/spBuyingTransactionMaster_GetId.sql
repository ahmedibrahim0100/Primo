CREATE PROCEDURE [dbo].[spBuyingTransactionMaster_GetId]
		
AS
BEGIN
	SET NOCOUNT ON;
	SELECT MAX(TransactionId) FROM dbo.BuyingTransactionsMaster;
END
