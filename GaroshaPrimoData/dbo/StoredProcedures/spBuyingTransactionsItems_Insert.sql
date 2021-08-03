CREATE PROCEDURE [dbo].[spBuyingTransactionsItems_Insert]
		  @Id int output,
          @BuyingTransactionId int, 
          @ItemId int,
          @ItemExpiryDate datetime2, 
          @BuyingTransactionItemQuantity decimal, 
          @ItemSellingPrice money,
          @ItemBuyingDiscountPercentage decimal, 
          @ItemBuyingPrice money,
          @ItemSubtotal money,
          @ItemBuyingTaxesPercentage decimal, 
          @ItemBuyingTaxesValue money,
          @ItemTotal money
AS
BEGIN
	set nocount on;
	insert into dbo.BuyingTransactionsItems(
          BuyingTransactionId, 
          ItemId,
          ItemExpiryDate, 
          BuyingTransactionItemQuantity, 
          ItemSellingPrice,
          ItemBuyingDiscountPercentage, 
          ItemBuyingPrice,
          ItemSubtotal,
          ItemBuyingTaxesPercentage, 
          ItemBuyingTaxesValue,
          ItemTotal
		  )
		  values(
          @BuyingTransactionId, 
          @ItemId,
          @ItemExpiryDate, 
          @BuyingTransactionItemQuantity, 
          @ItemSellingPrice,
          @ItemBuyingDiscountPercentage, 
          @ItemBuyingPrice,
          @ItemSubtotal,
          @ItemBuyingTaxesPercentage, 
          @ItemBuyingTaxesValue,
          @ItemTotal
		  );
		  select @Id = SCOPE_IDENTITY();

END
