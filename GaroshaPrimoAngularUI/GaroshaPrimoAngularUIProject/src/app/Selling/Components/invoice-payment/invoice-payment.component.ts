import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BankCardPayment } from '../../Models/bank-card-payment.model';
import { ContractorPayment } from '../../Models/contractor-payment.model';
import { InvoicePayment } from '../../Models/invoice-payment.model';
import { PaymentType } from '../../Models/payment-type.model';

@Component({
  selector: 'app-invoice-payment',
  templateUrl: './invoice-payment.component.html',
  styleUrls: ['./invoice-payment.component.css']
})
export class InvoicePaymentComponent implements OnInit {

  invoicePayment : InvoicePayment;
  bankCradsPayments : BankCardPayment[] = [];
  contractorsPayments : ContractorPayment[] = [];
  totalAmount : number;
  paymentAmount : number;
  _returnToCustomer : number;
  stillShouldPayAmount : number;
  isProcessValid : boolean = false;
  
  public set returnToCustomer(v : number) {
    if(v >= 0){
      this.isProcessValid = true;
    }else{
      this.isProcessValid = false;
    }
    this._returnToCustomer = v;
  }


cashAmount : number;

  
cardAmount : number;
 
cardNumber : string;

contractorAmount : number;

contractorName : string;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<InvoicePaymentComponent>   
  ) { }

  ngOnInit(): void {
   this.resetAmounts();
  }

  processInvoice(){
    this.invoicePayment = {
      cash : this.cashAmount,
      bankCardsPayments : this.bankCradsPayments,
      contractorsPayments : this.contractorsPayments
    }
    this.dialogRef.close(this.invoicePayment);
  }

  resetAmounts(){
    this.totalAmount = this.data;
   this.paymentAmount = 0;
   this.stillShouldPayAmount = 0;
   this.returnToCustomer = this.paymentAmount - this.totalAmount;

   this.cashAmount = 0;
   this.cardAmount = 0;
   this.cardNumber = null;
   this.contractorAmount = 0;
   this.contractorName = null;
  }

  processCalculations(){
    this.paymentAmount = this.cashAmount + this.cardAmount + this.contractorAmount;
    if(this.paymentAmount >= this.totalAmount){
      this.stillShouldPayAmount = 0;
      this.returnToCustomer = this.paymentAmount - this.totalAmount;
    }else{
      this.stillShouldPayAmount = this.totalAmount - this.paymentAmount;
      this.returnToCustomer = 0;
    }

    this.assignCardPayment();
    this.assginContractorPayment();
  }

  assignCardPayment(){
    if(this.cardAmount > 0){
      let _cardPayment : BankCardPayment = {
        amount : this.cardAmount,
        cardNumber : this.cardNumber
      };
      this.bankCradsPayments.push(_cardPayment);
    }else{
      this.bankCradsPayments = [];
    }
  }

  assginContractorPayment(){
    if(this.contractorAmount > 0){
      let _contractorPayment : ContractorPayment = {
        amount : this.contractorAmount,
        contractorId : 1
      };
      this.contractorsPayments.push(_contractorPayment);
    }else{
      this.contractorsPayments = [];
    }
  }

}
