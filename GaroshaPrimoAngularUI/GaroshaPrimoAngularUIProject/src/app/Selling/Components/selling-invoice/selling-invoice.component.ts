import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/Items/Models/item-model.model';
import { Observer } from 'rxjs';
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


@Component({
  selector: 'app-selling-invoice',
  templateUrl: './selling-invoice.component.html',
  styleUrls: ['./selling-invoice.component.css']
})
export class SellingInvoiceComponent implements OnInit {

  selectedItems? : ItemModel[];
  sellingTransactionMaster : SellingTransactionMasterData;
  saleItems : SaleItem[];
  saleItemsDisplay : SaleItemDisplay[];
  saleCustomer : Customer;
  sellingTransactionTypes : SellingTransactionType[];

  constructor(
    private dialog: MatDialog,
    private customersService : CustomersService,
    private sellingTransactionsService : SellingTransactionsService,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.resetForm();
    // this.saleItems = new Array<SaleItem>();
    // this.saleItemsDisplay = new Array<SaleItemDisplay>();
    // this.sellingTransactionMaster = new SellingTransactionMasterData();
  }

  async onGettingItems(addedItems : ItemModel[]) {
    await addedItems;
    const no = await addedItems.length;
    if(no > 1){
      this.dialog.open(ItemsBrowserComponent);
    }else if(no == 1){
        var saleItemDisplay : SaleItemDisplay
        saleItemDisplay = {
              ItemId: addedItems[0].ItemId,
              ItemNameEnglish : addedItems[0].ItemNameEnglish,
              ItemExpiryDate: addedItems[0].ExpiryDate,
              SellingTransactionItemQuantity: 1,
              ItemSellingPrice: addedItems[0].ItemSellingPrice,
              Stock : addedItems[0].Stock,
              ItemSubtotal: 0,
              ItemSellingDiscountPercentage: 0,
              ItemSellingDiscountValue: 0,
              ItemSellingTaxesPercentage: addedItems[0].TaxesPercentageOnSelling,
              ItemSellingTaxesValue: 0,
              ItemTotal: 0,
              ItemCostOnSelling : 
              (addedItems[0].ItemBuyingPrice + addedItems[0].TaxesValueOnBuying) * 1
        }
        this.saleItemsDisplay.push(await saleItemDisplay);
    }
    console.log(no);
  }

  onCannotGetItems(){

  }

  async onGettingCustomers(retrievedCustomers : Customer[]){
    await retrievedCustomers;
    const no = await retrievedCustomers.length;
    if(no > 1){
      this.dialog.open(CustomersBrowserComponent);
    }else if(no == 1){
      this.saleCustomer = retrievedCustomers[0];
    }
  }

  onCannotGetCustomers(){

  }

  // configureDialog() : any {
  //   const dialogConfig = new MatDialogConfig();
  //     dialogConfig.autoFocus = true;
  //     dialogConfig.disableClose = true;
  //     dialogConfig.width = "50%";
  //     return dialogConfig;
  // }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.saleItemsDisplay = [];
    this.saleItems = [];
    this.saleCustomer = new Customer();
    this.saleCustomer.CustomerId = 1;
    this.saleCustomer.CustomerName = 'Anonymous';
    this.sellingTransactionsService.getAllSellingTransactionTypes()
      .then(res => this.sellingTransactionTypes = res as SellingTransactionType[]);

    this.sellingTransactionMaster = {
      TransactionId: null,
      SellingTransactionTypeId: 1,
      TransactionTiming: new Date(),
      Subtotal: 0,
      Taxes: 0,
      Total: 0,
      SellerId: null,
      ShiftOwnerId : this.userService.getLoggedInUser().Id,
      CustomerId : 1,
      NumberOfItems: 0,
      NumberOfPieces: 0
    }

    console.log('ShiftOwner : '+this.userService.getLoggedInUser().Id);
  }




}
