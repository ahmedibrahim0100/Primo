import { InvoicePayment } from "./invoice-payment.model";
import { SaleItem } from "./sale-item.model";

export class SellingTransactionMasterData {
    //TransactionId : number; 
    SellingTransactionTypeId : number; 
    //TransactionTiming : Date; 
    Subtotal : number; 
    CalculatedTaxesPercentage : number;
    CalculatedTaxesValue : number; 
    CalculatedDiscountPercentage : number;
    CalculatedDiscountValue : number;
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
    InvoicePayment : InvoicePayment;
    SaleItems : SaleItem[];
}
