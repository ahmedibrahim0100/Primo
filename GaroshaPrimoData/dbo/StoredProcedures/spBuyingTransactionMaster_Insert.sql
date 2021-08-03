CREATE PROCEDURE [dbo].[spBuyingTransactionMaster_Insert]
	   @TransactionId int output,
       @TransactionTiming datetime2,
       @Subtotal money,
       @CalculatedTaxesPercentage decimal, 
       @CalculatedTaxesValue money,
       @CalculatedRetailDiscountPercentage decimal, 
       @CalculatedRetailDiscountValue money,
       @TaxesPercentageOverInvoice decimal,
       @TaxesValueOverInvoice money,
       @RetailDiscountPercentageOverInvoice decimal, 
       @RetailDiscountValueOverInvoice money,
       @Total money,
       @UserId nvarchar(128),
       @ShiftOwnerId nvarchar(128),
       @VendorId int,
       @NumberOfItems int,
       @NumberOfPieces decimal

	As
	Begin
	set nocount on;

	insert into dbo.BuyingTransactionsMaster (
     TransactionTiming,
     Subtotal,
     CalculatedTaxesPercentage, 
     CalculatedTaxesValue,
     CalculatedRetailDiscountPercentage, 
     CalculatedRetailDiscountValue,
     TaxesPercentageOverInvoice,
     TaxesValueOverInvoice,
     RetailDiscountPercentageOverInvoice, 
     RetailDiscountValueOverInvoice,
     Total,
     UserId,
     ShiftOwnerId,
     VendorId,
     NumberOfItems,
     NumberOfPieces
	)
	values(
     @TransactionTiming,
     @Subtotal,
     @CalculatedTaxesPercentage, 
     @CalculatedTaxesValue,
     @CalculatedRetailDiscountPercentage, 
     @CalculatedRetailDiscountValue,
     @TaxesPercentageOverInvoice,
     @TaxesValueOverInvoice,
     @RetailDiscountPercentageOverInvoice, 
     @RetailDiscountValueOverInvoice,
     @Total,
     @UserId,
     @ShiftOwnerId,
     @VendorId,
     @NumberOfItems,
     @NumberOfPieces
	);
	select @TransactionId = SCOPE_IDENTITY();

	End