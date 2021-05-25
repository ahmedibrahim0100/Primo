import { Component, OnInit, HostListener } from '@angular/core';
import { ItemModel } from 'src/app/Items/Models/item-model.model';
import { Observer, of } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ItemsBrowserComponent } from 'src/app/Items/Components/items-browser/items-browser.component';
import { SellingTransactionMasterData } from '../../Models/selling-transaction-master-data.model';
import { NgForm } from '@angular/forms';
import { SaleItem } from '../../Models/sale-item.model';
import { __await } from 'tslib';
import { promise } from 'protractor';
import { resolve } from 'dns';
import { async } from '@angular/core/testing';
import { debug } from 'console';
import { SaleItemDisplay } from '../../Models/sale-item-display.model';
import { Customer } from 'src/app/Customers/Models/customer.model';
import { CustomersService } from 'src/app/Customers/Services/customers.service';
import { CustomersBrowserComponent } from 'src/app/Customers/Components/customers-browser/customers-browser.component';
import { SellingTransactionType } from '../../Models/selling-transaction-type.model';
import { SellingTransactionsService } from '../../Services/selling-transactions.service';
import { UserService } from 'src/app/Authentication/Services/user.service';
import { User } from 'src/app/Authentication/Models/user.model';
import { AssignUserComponent } from 'src/app/Authentication/Components/assign-user/assign-user.component';
import { InvoicePaymentComponent } from '../invoice-payment/invoice-payment.component';
import { InvoicePayment } from '../../Models/invoice-payment.model';


@Component({
  selector: 'app-selling-invoice',
  templateUrl: './selling-invoice.component.html',
  styleUrls: ['./selling-invoice.component.css']
})
export class SellingInvoiceComponent implements OnInit {

//#region Member Variables
  selectedItems? : ItemModel[];
  saleItems : SaleItem[];
  saleItemsDisplay : SaleItemDisplay[];
  sellingTransactionTypes : SellingTransactionType[];

  sellingTransactionMaster : SellingTransactionMasterData;
  saleTypeId : number;
  saleSubtotal : number;
  saleCalculatedTaxesPercentage: number;
  saleCalculatedTaxesValue : number;
  saleCalculatedDiscountPercentage: number;
  saleCalculatedDiscountValue : number; 
  TaxesPercentageOverInvoice : number;
  TaxesValueOverInvoice : number;
  DiscountPercentageOverInvoice : number;
  DiscountValueOverInvoice : number;
  saleTotal : number;
  saleCustomer : Customer;
  salesMan : User;
  shiftOwner : User;
  saleNumberOfItems : number;
  saleNumberOfPieces : number;
  invoicePayment : InvoicePayment;
//#endregion

  constructor(
    private dialog: MatDialog,
    private customersService: CustomersService,
    private sellingTransactionsService: SellingTransactionsService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.resetForm();
    // this.saleItems = new Array<SaleItem>();
    // this.saleItemsDisplay = new Array<SaleItemDisplay>();
    // this.sellingTransactionMaster = new SellingTransactionMasterData();
  }

  async onGettingItems(addedItems: ItemModel[]) {
    await addedItems;
    const no = await addedItems.length;
    if (no > 1) {
      this.dialog.open(ItemsBrowserComponent);
    } else if (no == 1) {
      
      var saleItemDisplay: SaleItemDisplay;
      saleItemDisplay = {
        ItemId: addedItems[0].ItemId,
        ItemNameEnglish: addedItems[0].ItemNameEnglish,
        ItemExpiryDate: addedItems[0].ExpiryDate,
        SellingTransactionItemQuantity: 1,
        ItemSellingPrice: addedItems[0].ItemSellingPrice,
        Stock: addedItems[0].Stock,
        ItemSubtotal: addedItems[0].ItemSellingPrice,
        ItemSellingDiscountPercentage: 0,
        ItemSellingDiscountValue: 0,
        ItemSellingTaxesPercentage: addedItems[0].TaxesPercentageOnSelling,
        ItemSellingTaxesValue: (addedItems[0].TaxesPercentageOnSelling * addedItems[0].ItemSellingPrice) / 100,
        ItemTotal: addedItems[0].ItemSellingPrice +
          ((addedItems[0].TaxesPercentageOnSelling * addedItems[0].ItemSellingPrice) / 100),
        ItemBuyingPrice : addedItems[0].ItemBuyingPrice,
        TaxesValueOnBuying : addedItems[0].TaxesValueOnBuying,
        ItemCostOnSelling:
          (addedItems[0].ItemBuyingPrice + addedItems[0].TaxesValueOnBuying) * 1
      }

      this.saleItemsDisplay.push(await saleItemDisplay);
      this._lastItemAddedTime = Date.now();

      this.updateTransactionTotals();

    }
    console.log(no);

    //-------Test----------
    console.log(this.saleItemsDisplay);
    //-----------------
  }

  onCannotGetItems() {

  }

  async onGettingCustomers(retrievedCustomers: Customer[]) {
    await retrievedCustomers;
    const no = await retrievedCustomers.length;
    if (no > 1) {
      this.dialog.open(CustomersBrowserComponent);
    } else if (no == 1) {
      this.saleCustomer = retrievedCustomers[0];
    }
  }

  onCannotGetCustomers() {

  }

  configureDialog(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    return dialogConfig;
  }

  onChangeSalesManRequest() {
    this.dialog.open(AssignUserComponent, this.configureDialog())
      .afterClosed()
      .subscribe((data: User) => {
        if (!data) return;
        this.salesMan = data as User;
        console.log(this.salesMan.Name);
      });
  }


//#region Calculations functions to apply for each individual item
  updateItemSubtotal(index: number) {
    this.saleItemsDisplay[index].ItemSubtotal =
      this.saleItemsDisplay[index].SellingTransactionItemQuantity * this.saleItemsDisplay[index].ItemSellingPrice;
  }

  updateItemCostOnSelling(index : number){
    this.saleItemsDisplay[index].ItemCostOnSelling =
      (this.saleItemsDisplay[index].ItemBuyingPrice + this.saleItemsDisplay[index].TaxesValueOnBuying)
        * this.saleItemsDisplay[index].SellingTransactionItemQuantity;
  }

  updateItemSellingTaxesValue(index: number) {
    this.saleItemsDisplay[index].ItemSellingTaxesValue =
      (this.saleItemsDisplay[index].ItemSubtotal * this.saleItemsDisplay[index].ItemSellingTaxesPercentage) / 100;
  }

  updateItemSellingTaxesPercentage(index: number) {
    this.saleItemsDisplay[index].ItemSellingTaxesPercentage =
      (this.saleItemsDisplay[index].ItemSellingTaxesValue / this.saleItemsDisplay[index].ItemSubtotal) * 100;

    this.updateItemTotal(index);
  }

  updateItemSellingDiscountValue(index: number) {
    this.saleItemsDisplay[index].ItemSellingDiscountValue =
      ((this.saleItemsDisplay[index].ItemSubtotal + this.saleItemsDisplay[index].ItemSellingTaxesValue)
        * this.saleItemsDisplay[index].ItemSellingDiscountPercentage) / 100;

    
  }

  updateItemSellingDiscountPercentage(index: number) {
    this.saleItemsDisplay[index].ItemSellingDiscountPercentage =
      (this.saleItemsDisplay[index].ItemSellingDiscountValue /
        (this.saleItemsDisplay[index].ItemSubtotal + this.saleItemsDisplay[index].ItemSellingTaxesValue)) * 100;
  }

  updateItemTotal(index: number) {
    this.saleItemsDisplay[index].ItemTotal =
      (this.saleItemsDisplay[index].ItemSubtotal + this.saleItemsDisplay[index].ItemSellingTaxesValue)
      - this.saleItemsDisplay[index].ItemSellingDiscountValue;
  }

//#endregion


//#region Calculations functions to apply for the transaction as a whole
  updateSaleSubtotal() {
    let result = 0;
    this.saleItemsDisplay.forEach(element => {
      result += element.ItemSubtotal;
    });
    this.saleSubtotal = result;
  }

  updateSaleCalculatedTaxesValue() {
    let result = 0;
    this.saleItemsDisplay.forEach(element => {
      result += element.ItemSellingTaxesValue
    });
    this.saleCalculatedTaxesValue = result;
  }

  updateSaleCalculatedTaxesPercentage() {
    this.saleCalculatedTaxesPercentage =
    (this.saleCalculatedTaxesValue / this.saleSubtotal) * 100;
  }

  updateSaleCalculatedDiscountValue() {
    let result = 0;
    this.saleItemsDisplay.forEach(element => {
      result += element.ItemSellingDiscountValue
    });
    this.saleCalculatedDiscountValue = result;
  }

  updateSaleCalculatedDiscountPercentage() {
    this.saleCalculatedDiscountPercentage = 
    (this.saleCalculatedDiscountValue /
      (this.saleSubtotal
        + this.saleCalculatedTaxesValue))
      * 100;
  }

  //Called when the user changes TaxesPercentageOverInvoice manually
  updateTaxesValueOverInvoice() {
    this.TaxesValueOverInvoice =
      (this.saleSubtotal
        * this.TaxesPercentageOverInvoice)
          / 100;
  }

  //Called when the user changes TaxesValueOverInvoice manually
  updateTaxesPercentageOverInvoice() {
    this.TaxesPercentageOverInvoice =
      (this.TaxesValueOverInvoice
        / this.saleSubtotal)
          * 100;
  }

  //Called when the user changes DiscountValueOverInvoice manually
  updateDiscountPercentageOverInvoice() {
    this.DiscountPercentageOverInvoice =
      (this.DiscountValueOverInvoice
        / (this.saleSubtotal
          + this.saleCalculatedTaxesValue
            + this.TaxesValueOverInvoice))
              * 100;
  }

  updateDiscountValueOverInvoice() {
    this.DiscountValueOverInvoice =
      (this.DiscountPercentageOverInvoice
        * (this.saleSubtotal
          + this.saleCalculatedTaxesValue
            + this.TaxesValueOverInvoice))
              / 100;
  }


  updateSaleTotal() {
    this.saleTotal = 
      this.saleSubtotal
        + this.saleCalculatedTaxesValue
          + this.TaxesValueOverInvoice 
            - this.saleCalculatedDiscountValue 
              - this.DiscountValueOverInvoice;
  }

//#endregion

  updateTransactionTotals(){
    this.updateSaleSubtotal();
    this.updateSaleCalculatedTaxesValue();
    this.updateSaleCalculatedTaxesPercentage();
    this.updateSaleCalculatedDiscountValue();
    this.updateSaleCalculatedDiscountPercentage();
    this.updateTaxesValueOverInvoice();
    this.updateDiscountValueOverInvoice();
    this.updateSaleTotal();
  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.saleTypeId = 1;
    this.saleSubtotal = 0;
    this.saleCalculatedTaxesPercentage = 0;
    this.saleCalculatedTaxesValue = 0;
    this.saleCalculatedDiscountPercentage = 0;
    this.saleCalculatedDiscountValue = 0;
    this.TaxesPercentageOverInvoice = 0;
    this.TaxesValueOverInvoice = 0;
    this.DiscountPercentageOverInvoice = 0;
    this.DiscountValueOverInvoice = 0;
    this.saleTotal = 0;
    this.salesMan = this.userService.loggedInUser;
    this.shiftOwner = this.userService.loggedInUser;
    this.saleCustomer = new Customer();
    this.saleCustomer.CustomerId = 1;
    this.saleCustomer.CustomerName = 'Anonymous'; 
    this.saleNumberOfItems = 0;
    this.saleNumberOfPieces = 0;
    this.saleItemsDisplay = [];
    this.saleItems = [];
    
    this.sellingTransactionsService.getAllSellingTransactionTypes()
      .then(res => this.sellingTransactionTypes = res as SellingTransactionType[]);
  }


  onChangeItemQuantity(index : number){
    this.updateItemSubtotal(index);
    this.updateItemCostOnSelling(index);
    this.updateItemSellingTaxesValue(index);
    this.updateItemSellingDiscountValue(index);
    this.updateItemTotal(index);
    this.updateTransactionTotals();

    //-------Test----------
    console.log(this.saleItemsDisplay);
    //-----------------
  }

  onChangeItemSellingTaxesPercentage(index : number){
    this.updateItemSellingTaxesValue(index);
    this.updateItemSellingDiscountValue(index);
    this.updateItemTotal(index);
    this.updateTransactionTotals();
  }

  onChangeItemSellingTaxesValue(index : number){
    this.updateItemSellingTaxesPercentage(index);
    this.updateItemSellingDiscountValue(index);
    this.updateItemTotal(index);
    this.updateTransactionTotals();
  }

  onChangeItemSellingDiscountPercentage(index : number){
    this.updateItemSellingDiscountValue(index);
    this.updateItemTotal(index);
    this.updateTransactionTotals();
  }

  onChangeItemSellingDiscountValue(index : number){
    this.updateItemSellingDiscountPercentage(index);
    this.updateItemTotal(index);
    this.updateTransactionTotals();
  }



  onChangeTaxesValueOverInvoice(){
    this.updateTaxesPercentageOverInvoice();
    this.updateDiscountValueOverInvoice();
    this.updateSaleTotal();
  }

  onChangeTaxesPercentageOverInvoice(){
    this.updateTaxesValueOverInvoice();
    this.updateDiscountValueOverInvoice();
    this.updateSaleTotal();
  }

  onChangeDiscountValueOverInvoice(){
    this.updateDiscountPercentageOverInvoice();
    this.updateSaleTotal();
  }

  onChangeDiscountPercentageOverInvoice(){
    this.updateDiscountValueOverInvoice();
    this.updateSaleTotal();
  }

  onTenderClick(){
    this.dialog.open(InvoicePaymentComponent, {
      autoFocus: true,
      disableClose: true,
      width: '50%',
      data: this.saleTotal
    })
      .afterClosed()
      .subscribe((data : InvoicePayment) => {
        if (!data) return;
        this.invoicePayment = data;
        this.stageSellingTransaction();
        console.log(this.sellingTransactionMaster);
        this.sellingTransactionsService.postSellingTransaction(this.sellingTransactionMaster)
          .then(res => {
            console.log(res);
            this.resetForm();
          }
            );
      });
  }

  stageSellingTransaction(){
    this.saleItemsDisplay.forEach(item => {
      let saleItem : SaleItem = {
        ItemId : item.ItemId,
        ItemExpiryDate : item.ItemExpiryDate,
        SellingTransactionItemQuantity : item.SellingTransactionItemQuantity,
        ItemSellingPrice : item.ItemSellingPrice,
        ItemSubtotal : item.ItemSubtotal,
        ItemSellingDiscountPercentage : item.ItemSellingDiscountPercentage,
        ItemSellingDiscountValue : item.ItemSellingDiscountValue,
        ItemSellingTaxesPercentage : item.ItemSellingTaxesPercentage,
        ItemSellingTaxesValue : item.ItemSellingTaxesValue,
        ItemTotal : item.ItemTotal,
        ItemCostOnSelling : item.ItemCostOnSelling,
        ItemStock : item.Stock
      }

      this.saleItems.push(saleItem);
    })

    this.sellingTransactionMaster = {
      SellingTransactionTypeId : this.saleTypeId,
    Subtotal : this.saleSubtotal,
    CalculatedTaxesPercentage : this.saleCalculatedTaxesPercentage,
    CalculatedTaxesValue : this.saleCalculatedTaxesValue,
    CalculatedDiscountPercentage : this.saleCalculatedDiscountPercentage,
    CalculatedDiscountValue : this.saleCalculatedDiscountValue,
    TaxesPercentageOverInvoice : this.TaxesPercentageOverInvoice,
    TaxesValueOverInvoice : this.TaxesValueOverInvoice,
    DiscountPercentageOverInvoice : this.DiscountPercentageOverInvoice,
    DiscountValueOverInvoice : this.DiscountValueOverInvoice,
    Total : this.saleTotal,
    SellerId : this.salesMan.Id,
    ShiftOwnerId : this.shiftOwner.Id,
    CustomerId : this.saleCustomer.CustomerId,
    NumberOfItems : this.saleNumberOfItems,
    NumberOfPieces : this.saleNumberOfPieces,
    InvoicePayment : this.invoicePayment,
    SaleItems : this.saleItems
    }
  }

  _lastKeyStrokeTime : number = 0;
  _barcodePickedCharsList : any[] = [];
  _lastItemAddedTime : number = 0;
  barcodeScannerResult : string = '';

  @HostListener('window:keydown', ['$event'])
  actOnKeyDown(e: KeyboardEvent){
    console.log(e);
    
    let elapsedTime = e.timeStamp - this._lastKeyStrokeTime;
    if(elapsedTime > 100){
      this._barcodePickedCharsList = [];
    }
    this._barcodePickedCharsList.push(e.key);
    this._lastKeyStrokeTime = e.timeStamp;

    let addItemInterval = this._lastKeyStrokeTime - this._lastItemAddedTime;

    if(addItemInterval > 100){
      if(e.key == 'Enter' && this._barcodePickedCharsList.length > 1){
        this._barcodePickedCharsList.pop();
        this.barcodeScannerResult = this._barcodePickedCharsList.join('');
      }
      // if (e.KeyChar == 13 && _barcode.Count > 1)
      //           {
      //               _barcode.RemoveAt(_barcode.Count - 1);
      //               string msg = new String(_barcode.ToArray());
      //               txtbxItemIdentification.Text = msg;
      //               AddtoDgvTransactions();
      //               //MessageBox.Show(msg);
      //               _barcode.Clear();
      //           }
    }
  }
}
