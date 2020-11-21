export class SellingTransactionMasterData {
    TransactionId : number; 
    SellingTransactionTypeId : number; 
    TransactionTiming : Date; 
    Subtotal : number; 
    TaxesPercentage : number;
    TaxesValue : number; 
    DiscountPercentage : number;
	DiscountValue : number;
    Total : number; 
    SellerId : string; 
    ShiftOwnerId : string;
    CustomerId : number; 
    NumberOfItems : number; 
    NumberOfPieces : number; 
}
