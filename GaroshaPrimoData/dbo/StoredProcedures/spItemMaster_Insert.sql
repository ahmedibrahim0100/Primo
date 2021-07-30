CREATE PROCEDURE [dbo].[spItemMaster_Insert]
		@ItemId INT output,
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
        @LastModified DATETIME2,
		@ItemStatus NVARCHAR(10)
AS
	BEGIN
	SET NOCOUNT ON;
	INSERT INTO dbo.ItemsMaster(
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
    LastModified,
	ItemStatus
	)
	VALUES (
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
    @LastModified,
	@ItemStatus
	);

	SELECT @ItemId = SCOPE_IDENTITY();

	END