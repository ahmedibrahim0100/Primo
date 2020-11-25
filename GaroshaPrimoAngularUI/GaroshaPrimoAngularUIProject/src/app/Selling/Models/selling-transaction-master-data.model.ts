export class SellingTransactionMasterData {
    TransactionId : number; 
    SellingTransactionTypeId : number; 
    TransactionTiming : Date; 
    Subtotal : number; 
    calculatedTaxesPercentage : number;
    calculatedTaxesValue : number; 
    calculatedDiscountPercentage : number;
    calculatedDiscountValue : number;
    TaxesPercentageOverInvoice : number;
    TaxesValueOverInvoice : number;
    DiscountPercentageOverInvoice : number;
    DiscountValueOverInvoice : number;
    Total : number; 
    SellerId : string; 
    ShiftOwnerId : string;
    CustomerId : number; 
    NumberOfItems : number; 
    NumberOfPieces : number; 
}
