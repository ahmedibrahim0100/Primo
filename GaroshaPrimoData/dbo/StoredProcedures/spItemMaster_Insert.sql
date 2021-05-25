CREATE PROCEDURE [dbo].[spItemMaster_Insert]
		@ItemId INT OUTPUT,
        @ItemNameEnglish NVARCHAR(200),
        @ItemOtherName  NVARCHAR(200),
        @ProducerCompanyId INT,
        @ItemSellingPrice MONEY,
        @ItemBuyingDiscountPercentage DECIMAL, 
        @ItemBuyingPrice MONEY,
        @TaxesPercentageOnBuying DECIMAL,
        @TaxesValueOnBuying MONEY,
        @TaxesPercentageOnSelling DECIMAL,
        @TaxesValueOnSelling MONEY,
        @ItemDescription NVARCHAR(MAX),
        @CreatedDate DATETIME2,
        @LastModified DATETIME2
AS
	BEGIN
	SET NOCOUNT ON;
	INSERT INTO dbo.ItemsMaster(
	ItemId, 
    ItemNameEnglish, 
    ItemOtherName, 
    ProducerCompanyId, 
    ItemSellingPrice, 
    ItemBuyingDiscountPercentage, 
    ItemBuyingPrice, 
    TaxesPercentageOnBuying, 
	TaxesValueOnBuying,
	TaxesPercentageOnSelling,
	TaxesValueOnSelling,
    ItemDescription, 
    CreatedDate, 
    LastModified
	)
	VALUES (
	@ItemId, 
    @ItemNameEnglish, 
    @ItemOtherName, 
    @ProducerCompanyId, 
    @ItemSellingPrice, 
    @ItemBuyingDiscountPercentage, 
    @ItemBuyingPrice, 
    @TaxesPercentageOnBuying, 
	@TaxesValueOnBuying,
	@TaxesPercentageOnSelling,
	@TaxesValueOnSelling,
    @ItemDescription, 
    @CreatedDate,
    @LastModified
	)

	SELECT @ItemId = SCOPE_IDENTITY();

	END