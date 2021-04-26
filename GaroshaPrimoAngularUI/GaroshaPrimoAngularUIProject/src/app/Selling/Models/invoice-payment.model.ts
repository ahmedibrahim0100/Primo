import { BankCardPayment } from "./bank-card-payment.model";
import { ContractorPayment } from "./contractor-payment.model";

export class InvoicePayment {
    cash : number;
    bankCardsPayments : BankCardPayment[];
    contractorsPayments : ContractorPayment[];
}
