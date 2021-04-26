CREATE PROCEDURE [dbo].[spSellingTransactionMaster_Insert]
	@TransactionId INT output,
	@SellingTransactionTypeId INT, 
    @TransactionTiming DATETIME2, 
    @Subtotal MONEY,
	@calculatedTaxesPercentage DECIMAL, 
    @calculatedTaxesValue MONEY, 
	@calculatedDiscountPercentage DECIMAL,
	@calculatedDiscountValue MONEY,
	@TaxesPercentageOverInvoice DECIMAL,
	@TaxesValueOverInvoice MONEY,
	@DiscountPercentageOverInvoice DECIMAL,
	@DiscountValueOverInvoice MONEY,
    @Total MONEY, 
    @SellerId NVARCHAR(128), 
	@ShiftOwnerId NVARCHAR(128),
    @CustomerId INT, 
    @NumberOfItems INT, 
    @NumberOfPieces DECIMAL

AS
	Begin
	set nocount on;
	insert into dbo.SellingTransactionsMaster(
	SellingTransactionTypeId,
	TransactionTiming,
	Subtotal,
	calculatedTaxesPercentage, 
    calculatedTaxesValue, 
	calculatedDiscountPercentage,
	calculatedDiscountValue,
	TaxesPercentageOverInvoice,
	TaxesValueOverInvoice,
	DiscountPercentageOverInvoice,
	DiscountValueOverInvoice,
    Total, 
    SellerId, 
	ShiftOwnerId,
    CustomerId, 
    NumberOfItems, 
    NumberOfPieces
	)
	values(
	@SellingTransactionTypeId, 
    @TransactionTiming, 
    @Subtotal,
	@calculatedTaxesPercentage, 
    @calculatedTaxesValue, 
	@calculatedDiscountPercentage,
	@calculatedDiscountValue,
	@TaxesPercentageOverInvoice,
	@TaxesValueOverInvoice,
	@DiscountPercentageOverInvoice,
	@DiscountValueOverInvoice,
    @Total, 
    @SellerId, 
	@ShiftOwnerId,
    @CustomerId, 
    @NumberOfItems, 
    @NumberOfPieces
	);
	select @TransactionId = SCOPE_IDENTITY();
End

	