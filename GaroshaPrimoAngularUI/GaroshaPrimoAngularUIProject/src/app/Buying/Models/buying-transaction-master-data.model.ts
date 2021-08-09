import { BuyingTransactionItemModel } from "./buying-transaction-item-model.model";

export class BuyingTransactionMasterData {
  Subtotal: number
  CalculatedTaxesPercentage: number;
  CalculatedTaxesValue: number;
  CalculatedRetailDiscountPercentage: number;
  CalculatedRetailDiscountValue: number;
  TaxesPercentageOverInvoice: number;
  TaxesValueOverInvoice: number;
  RetailDiscountPercentageOverInvoice: number;
  RetailDiscountValueOverInvoice: number;
  Total: number;
  UserId: string;
  ShiftOwnerId: string;
  VendorId: number;
  NumberOfItems: number;
  NumberOfPieces: number;
  BuyingTransactionItems: BuyingTransactionItemModel[];
}
