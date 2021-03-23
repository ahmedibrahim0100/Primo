import { Component, OnInit } from '@angular/core';
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
      var saleItemDisplay: SaleItemDisplay
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
        ItemCostOnSelling:
          (addedItems[0].ItemBuyingPrice + addedItems[0].TaxesValueOnBuying) * 1
      }
      this.saleItemsDisplay.push(await saleItemDisplay);
    }
    console.log(no);
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
//#region CalculationsFunctions
  updateItemSubtotal(index: number) {
    this.saleItemsDisplay[index].ItemSubtotal =
      this.saleItemsDisplay[index].SellingTransactionItemQuantity * this.saleItemsDisplay[index].ItemSellingPrice;
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

  updateSaleSubtotal() {
    this.saleItemsDisplay.forEach(element => {
      this.sellingTransactionMaster.Subtotal += element.ItemSubtotal
    });
  }

  updateCalculatedSaleTaxesValue() {
    this.saleItemsDisplay.forEach(element => {
      this.sellingTransactionMaster.CalculatedTaxesValue += element.ItemSellingTaxesValue
    });
  }

  updateCalculatedSaleTaxesPercentage() {
    (this.sellingTransactionMaster.CalculatedTaxesValue /
      this.sellingTransactionMaster.Subtotal) * 100;
  }

  updateCalculatedSaleDiscountValue() {
    this.saleItemsDisplay.forEach(element => {
      this.sellingTransactionMaster.CalculatedDiscountValue += element.ItemSellingDiscountValue
    });
  }

  updateCalculatedSaleDiscountPercentage() {
    (this.sellingTransactionMaster.CalculatedDiscountValue /
      (this.sellingTransactionMaster.Subtotal
        + this.sellingTransactionMaster.CalculatedTaxesValue))
      * 100;
  }

  //Called when the user changes TaxesPercentageOverInvoice manually
  updateTaxesValueOverInvoice() {
    this.sellingTransactionMaster.TaxesValueOverInvoice =
      (this.sellingTransactionMaster.Subtotal
        * this.sellingTransactionMaster.TaxesPercentageOverInvoice)
          / 100;
  }

  //Called when the user changes TaxesValueOverInvoice manually
  updateTaxesPercentageOverInvoice() {
    this.sellingTransactionMaster.TaxesPercentageOverInvoice =
      (this.sellingTransactionMaster.TaxesValueOverInvoice
        / this.sellingTransactionMaster.Subtotal)
          * 100;
  }

  //Called when the user changes DiscountValueOverInvoice manually
  updateDiscountPercentageOverInvoice() {
    this.sellingTransactionMaster.DiscountPercentageOverInvoice =
      (this.sellingTransactionMaster.DiscountValueOverInvoice
        / (this.sellingTransactionMaster.Subtotal
          + this.sellingTransactionMaster.CalculatedTaxesValue
            + this.sellingTransactionMaster.TaxesValueOverInvoice))
              * 100;
  }

  updateDiscountValueOverInvoice() {
    this.sellingTransactionMaster.DiscountValueOverInvoice =
      (this.sellingTransactionMaster.DiscountPercentageOverInvoice
        * (this.sellingTransactionMaster.Subtotal
          + this.sellingTransactionMaster.CalculatedTaxesValue
            + this.sellingTransactionMaster.TaxesValueOverInvoice))
              / 100;
  }


  updateSaleTotal() {
    this.sellingTransactionMaster.Total = 
      this.sellingTransactionMaster.Subtotal 
        + this.sellingTransactionMaster.CalculatedTaxesValue
          + this.sellingTransactionMaster.TaxesValueOverInvoice 
            - this.sellingTransactionMaster.CalculatedDiscountValue 
              - this.sellingTransactionMaster.DiscountValueOverInvoice;
  }
//#endregion

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.sellingTransactionMaster = new SellingTransactionMasterData();
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
    
    

    /*this.sellingTransactionMaster = {
      TransactionId: null,
      SellingTransactionTypeId: 1,
      TransactionTiming: new Date(),
      Subtotal: 0,
      CalculatedTaxesPercentage: 0,
      CalculatedTaxesValue: 0,
      CalculatedDiscountPercentage: 0,
      CalculatedDiscountValue: 0,
      TaxesPercentageOverInvoice: 0,
      TaxesValueOverInvoice: 0,
      DiscountPercentageOverInvoice: 0,
      DiscountValueOverInvoice: 0,
      Total: 0,
      SellerId : this.salesMan.Id,
      ShiftOwnerId : this.shiftOwner.Id,
      CustomerId: 1,
      NumberOfItems: 0,
      NumberOfPieces: 0
    }*/
  }

  onChangeItemQuantity(index : number){
    this.updateItemSubtotal(index);
    this.updateItemSellingTaxesValue(index);
    this.updateItemSellingDiscountValue(index);
    this.updateItemTotal(index);
  }

  onChangeItemSellingTaxesPercentage(index : number){
    this.updateItemSellingTaxesValue(index);
    this.updateItemSellingDiscountValue(index);
    this.updateItemTotal(index);
  }

  onChangeItemSellingTaxesValue(index : number){
    this.updateItemSellingTaxesPercentage(index);
    this.updateItemSellingDiscountValue(index);
    this.updateItemTotal(index);
  }

  onChangeItemSellingDiscountPercentage(index : number){
    this.updateItemSellingDiscountValue(index);
    this.updateItemTotal(index);
  }

  onChangeItemSellingDiscountValue(index : number){
    this.updateItemSellingDiscountPercentage(index);
    this.updateItemTotal(index);
  }
}
