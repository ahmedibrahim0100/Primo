CREATE PROCEDURE [dbo].[spSellingTransactionsItems_Insert]
	@Id int output,
	@SellingTransactionId int,
	@ItemId int,
	@ItemExpiryDate date,
	@SellingTransactionItemQuantity decimal,
	@ItemSellingPrice money,
	@ItemSubtotal money,
	@ItemSellingDiscountPercentage decimal,
	@ItemSellingDiscountValue money,
	@ItemSellingTaxesPercentage decimal,
	@ItemSellingTaxesValue money,
	@ItemTotal money,
	@ItemCostOnSelling money
AS
Begin
	set nocount on;
	insert into dbo.SellingTransactionsItems(
	SellingTransactionId,
	ItemId,
	ItemExpiryDate,
	SellingTransactionItemQuantity, 
    ItemSellingPrice, 
	ItemSubtotal,
    ItemSellingDiscountPercentage, 
    ItemSellingDiscountValue, 
	ItemSellingTaxesPercentage,
    ItemSellingTaxesValue, 
    ItemTotal, 
    ItemCostOnSelling
	)
	values(
	@SellingTransactionId,
	@ItemId,
	@ItemExpiryDate,
	@SellingTransactionItemQuantity,
	@ItemSellingPrice,
	@ItemSubtotal,
	@ItemSellingDiscountPercentage,
	@ItemSellingDiscountValue,
	@ItemSellingTaxesPercentage,
	@ItemSellingTaxesValue,
	@ItemTotal,
	@ItemCostOnSelling
	);
	select @Id = SCOPE_IDENTITY();
End