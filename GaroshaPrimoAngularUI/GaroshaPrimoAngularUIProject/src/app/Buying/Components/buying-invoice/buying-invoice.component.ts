import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { AssignUserComponent } from 'src/app/Authentication/Components/assign-user/assign-user.component';
import { User } from 'src/app/Authentication/Models/user.model';
import { UserService } from 'src/app/Authentication/Services/user.service';
import { ItemsBrowserComponent } from 'src/app/Items/Components/items-browser/items-browser.component';
import { ItemModel } from 'src/app/Items/Models/item-model.model';
import { SimpleAlertWindowComponent } from 'src/app/SharedTools/simple-alert-window/simple-alert-window.component';
import { Vendor } from 'src/app/Vendors/Models/vendor.model';
import { VendorsService } from 'src/app/Vendors/Services/vendors.service';
import { BuyingTransactionItemDisplayModel } from '../../Models/buying-transaction-item-display-model.model';
import { BuyingTransactionItemModel } from '../../Models/buying-transaction-item-model.model';
import { BuyingTransactionMasterData } from '../../Models/buying-transaction-master-data.model';
import { BuyingTransactionsService } from '../../Services/buying-transactions.service';

@Component({
  selector: 'app-buying-invoice',
  templateUrl: './buying-invoice.component.html',
  styleUrls: ['./buying-invoice.component.css']
})
export class BuyingInvoiceComponent implements OnInit {

  user: User;
  shiftOwner: User;

  allVendors: Vendor[];
  selectedVendorId: number;

  buyingTransactionItemsDisplay: BuyingTransactionItemDisplayModel[];
  buyingTransactionItems: BuyingTransactionItemModel[];
  buyingTransactionMaster: BuyingTransactionMasterData;

  buyingTransactionSubtotal: number;
  buyingTransactionCalculatedTaxesValue: number;
  buyingTransactionCalculatedTaxesPercentage: number;
  buyingTransactionCalculatedDiscountValue: number;
  buyingTransactionCalculatedDiscountPercentage: number;
  taxesValueOverTransaction: number;
  taxesPercentageOverTransaction: number;
  retailDiscountPercentageOverTransaction: number;
  retailDiscountValueOverTransaction: number;
  buyingTransactionTotal: number;
  numberOfItems: number;
  numberOfPieces: number;

  insertedCode : string;

  validationAlertString: string;

  constructor(
    private userService: UserService,
    private vendorsService: VendorsService,
    private buyingTransactionService: BuyingTransactionsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();

    this.user = this.userService.loggedInUser;
    this.shiftOwner = this.userService.loggedInUser;

    this.vendorsService.getAllVendors()
      .then(res => this.allVendors = res as Vendor[]);
    this.selectedVendorId = 1;

    this.buyingTransactionItemsDisplay = [];
    this.buyingTransactionItems = [];

    this.buyingTransactionSubtotal = 0;
    this.buyingTransactionCalculatedTaxesValue = 0;
    this.buyingTransactionCalculatedTaxesPercentage = 0;
    this.buyingTransactionCalculatedDiscountValue = 0;
    this.buyingTransactionCalculatedDiscountPercentage = 0;
    this.taxesValueOverTransaction = 0;
    this.taxesPercentageOverTransaction = 0;
    this.retailDiscountPercentageOverTransaction = 0;
    this.retailDiscountValueOverTransaction = 0;
    this.buyingTransactionTotal = 0;
    this.numberOfItems = 0;
    this.numberOfPieces = 0;

    this.insertedCode = '';

    this.validationAlertString = '';

    this.scannerResult$.subscribe(res => this.processScannedBarcode(res));
  }

  onChangeUserRequest() {
    this.dialog.open(AssignUserComponent, this.configureDialog())
      .afterClosed()
      .subscribe((data: User) => {
        if (!data) return;
        this.user = data as User;
        console.log(this.user.Name);
      })
  }

  configureDialog(): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    return dialogConfig;
  }

  async onGettingItems(addedItems: ItemModel[]) {
    await addedItems;
    const no = await addedItems.length;
    if (no > 1) {
      this.dialog.open(ItemsBrowserComponent);
    } else if (no == 1) {

      var buyingTransactionItemDisplay: BuyingTransactionItemDisplayModel;
      buyingTransactionItemDisplay = {
        ItemId: addedItems[0].ItemId,
        ItemNameEnglish: addedItems[0].ItemNameEnglish,
        ItemExpiryDate: addedItems[0].ExpiryDate,
        BuyingTransactionItemQuantity: 1,
        ItemSellingPrice: addedItems[0].ItemSellingPrice,
        ItemBuyingDiscountPercentage: addedItems[0].ItemBuyingDiscountPercentage,
        ItemBuyingPrice: addedItems[0].ItemBuyingPrice,
        ItemSubtotal: addedItems[0].ItemBuyingPrice,
        ItemBuyingTaxesPercentage: addedItems[0].TaxesPercentageOnBuying,
        ItemBuyingTaxesValue: addedItems[0].TaxesValueOnBuying,
        ItemTotal: addedItems[0].ItemSellingPrice +
          ((addedItems[0].TaxesPercentageOnSelling * addedItems[0].ItemSellingPrice) / 100),
        Stock: addedItems[0].Stock
      }

      this.buyingTransactionItemsDisplay.push(await buyingTransactionItemDisplay);
      this._lastItemAddedTime = Date.now();

      this.updateTransactionTotals();

    }
    console.log(no);

    //-------Test----------
    console.log(this.buyingTransactionItemsDisplay);
    //-----------------
  }

  onCannotGetItems() {

  }

  //#region Calculations functions to apply for each individual item
  updateItemSubtotal(index: number) {
    this.buyingTransactionItemsDisplay[index].ItemSubtotal =
      this.buyingTransactionItemsDisplay[index].BuyingTransactionItemQuantity * this.buyingTransactionItemsDisplay[index].ItemBuyingPrice;
  }

  updateItemBuyingTaxesValue(index: number) {
    this.buyingTransactionItemsDisplay[index].ItemBuyingTaxesValue =
      (this.buyingTransactionItemsDisplay[index].ItemSubtotal * this.buyingTransactionItemsDisplay[index].ItemBuyingTaxesPercentage) / 100;
  }

  updateItemBuyingTaxesPercentage(index: number) {
    this.buyingTransactionItemsDisplay[index].ItemBuyingTaxesPercentage =
      (this.buyingTransactionItemsDisplay[index].ItemBuyingTaxesValue / this.buyingTransactionItemsDisplay[index].ItemSubtotal) * 100;

    this.updateItemTotal(index);
  }

  updateItemBuyingPrice(index: number) {
    let ItemBuyingDiscountValue: number =
      (this.buyingTransactionItemsDisplay[index].ItemBuyingDiscountPercentage
        * this.buyingTransactionItemsDisplay[index].ItemSellingPrice) / 100;
    this.buyingTransactionItemsDisplay[index].ItemBuyingPrice =
      this.buyingTransactionItemsDisplay[index].ItemSellingPrice - ItemBuyingDiscountValue;
  }

  updateItemBuyingDiscountPercentage(index: number) {
    this.buyingTransactionItemsDisplay[index].ItemBuyingDiscountPercentage = 100 -
      ((this.buyingTransactionItemsDisplay[index].ItemBuyingPrice /
        this.buyingTransactionItemsDisplay[index].ItemSellingPrice) * 100);
  }

  updateItemTotal(index: number) {
    this.buyingTransactionItemsDisplay[index].ItemTotal =
      this.buyingTransactionItemsDisplay[index].ItemSubtotal + this.buyingTransactionItemsDisplay[index].ItemBuyingTaxesValue;
  }

  //#endregion

  //#region Calculations functions to apply for the transaction as a whole

  updateBuyingTransactionSubtotal() {
    let result = 0;
    this.buyingTransactionItemsDisplay.forEach(element => {
      result += element.ItemSubtotal;
    });
    this.buyingTransactionSubtotal = result;
  }

  updateBuyingTransactionCalculatedTaxesValue() {
    let result = 0;
    this.buyingTransactionItemsDisplay.forEach(element => {
      result += element.ItemBuyingTaxesValue
    });
    this.buyingTransactionCalculatedTaxesValue = result;
  }

  updateBuyingTransactionCalculatedTaxesPercentage() {
    this.buyingTransactionCalculatedTaxesPercentage =
      (this.buyingTransactionCalculatedTaxesValue / this.buyingTransactionSubtotal) * 100;
  }

  updateBuyingTransactionCalculatedDiscountValue() {
    let result = 0;
    this.buyingTransactionItemsDisplay.forEach(element => {
      result += ((element.ItemSellingPrice * element.BuyingTransactionItemQuantity) - element.ItemSubtotal)
    });
    this.buyingTransactionCalculatedDiscountValue = result;
  }

  updateBuyingTransactionCalculatedDiscountPercentage() {
    this.buyingTransactionCalculatedDiscountPercentage =
      (this.buyingTransactionCalculatedDiscountValue /
        this.buyingTransactionSubtotal)
      * 100;
  }

  updateTaxesValueOverTransaction() {
    this.taxesValueOverTransaction =
      (this.buyingTransactionSubtotal
        * this.taxesPercentageOverTransaction)
      / 100;
  }

  updateTaxesPercentageOverTransaction() {
    this.taxesPercentageOverTransaction =
      (this.taxesValueOverTransaction
        / this.buyingTransactionSubtotal)
      * 100;
  }

  updateRetailDiscountPercentageOverTransaction() {
    this.retailDiscountPercentageOverTransaction =
      (this.retailDiscountValueOverTransaction
        / this.buyingTransactionSubtotal)
      * 100;
  }

  updateRetailDiscountValueOverTransaction() {
    this.retailDiscountValueOverTransaction =
      (this.retailDiscountPercentageOverTransaction
        * this.buyingTransactionSubtotal)
      / 100;
  }

  updateBuyingTransactionTotal() {
    this.buyingTransactionTotal =
      this.buyingTransactionSubtotal
      + this.buyingTransactionCalculatedTaxesValue
      + this.taxesValueOverTransaction
      - this.retailDiscountValueOverTransaction;
  }

  updateNumberOfItems(){
   this.numberOfItems = this.buyingTransactionItemsDisplay.length;
  }

  updateNumberOfPieces(){
    this.buyingTransactionItemsDisplay.forEach(item => {
      this.numberOfPieces += item.BuyingTransactionItemQuantity
    });
  }

  updateTransactionTotals() {
    this.updateNumberOfItems();
    this.updateNumberOfPieces();
    this.updateBuyingTransactionSubtotal();
    this.updateBuyingTransactionCalculatedTaxesValue();
    this.updateBuyingTransactionCalculatedTaxesPercentage();
    this.updateBuyingTransactionCalculatedDiscountValue();
    this.updateBuyingTransactionCalculatedDiscountValue();
    this.updateTaxesValueOverTransaction();
    this.updateRetailDiscountValueOverTransaction();
    this.updateBuyingTransactionTotal();
  }

  //#endregion

  //#region Handlers
  onChangeItemQuantity(index: number) {
    this.updateItemSubtotal(index);
    this.updateItemBuyingTaxesValue(index);
    this.updateItemTotal(index);
    this.updateTransactionTotals();

    //-------Test----------
    console.log(this.buyingTransactionItemsDisplay);
    //-----------------
  }

  onChangeItemBuyingTaxesPercentage(index: number) {
    this.updateItemBuyingTaxesValue(index);
    this.updateItemTotal(index);
    this.updateTransactionTotals();
  }

  onChangeItemBuyingTaxesValue(index: number) {
    this.updateItemBuyingTaxesPercentage(index);
    this.updateItemTotal(index);
    this.updateTransactionTotals();
  }

  onChangeItemBuyingDiscountPercentage(index: number) {
    this.updateItemBuyingPrice(index);
    this.updateItemSubtotal(index);
    this.updateItemBuyingTaxesValue(index);
    this.updateItemTotal(index);
    this.updateTransactionTotals();
  }

  onChangeItemBuyingPrice(index: number) {
    this.updateItemBuyingDiscountPercentage(index);
    this.updateItemSubtotal(index);
    this.updateItemBuyingTaxesValue(index);
    this.updateItemTotal(index);
    this.updateTransactionTotals();
  }

  onChangeTaxesValueOverTransaction() {
    this.updateTaxesPercentageOverTransaction();
    this.updateBuyingTransactionTotal();
  }

  onChangeTaxesPercentageOverTransaction() {
    this.updateTaxesValueOverTransaction();
    this.updateBuyingTransactionTotal();
  }

  onChangeRetailDiscountValueOverTransaction() {
    this.updateRetailDiscountPercentageOverTransaction();
    this.updateBuyingTransactionTotal();
  }

  onChangeRetailDiscountPercentageOverTransaction() {
    this.updateRetailDiscountValueOverTransaction();
    this.updateBuyingTransactionTotal();
  }

  //#endregion


  //#region Processing the transaction

  stageBuyingTransaction() {
    this.buyingTransactionItemsDisplay.forEach(item => {
      let buyingTransactionItem: BuyingTransactionItemModel = {
        ItemId: item.ItemId,
        ItemExpiryDate: item.ItemExpiryDate,
        BuyingTransactionItemQuantity: item.BuyingTransactionItemQuantity,
        ItemSellingPrice: item.ItemSellingPrice,
        ItemBuyingDiscountPercentage: item.ItemBuyingDiscountPercentage,
        ItemBuyingPrice: item.ItemBuyingPrice,
        ItemSubtotal: item.ItemSubtotal,
        ItemBuyingTaxesPercentage: item.ItemBuyingTaxesPercentage,
        ItemBuyingTaxesValue: item.ItemBuyingTaxesValue,
        ItemTotal: item.ItemTotal
      };

      this.buyingTransactionItems.push(buyingTransactionItem);
    })

    this.buyingTransactionMaster = {
      Subtotal: this.buyingTransactionSubtotal,
      CalculatedTaxesPercentage: this.buyingTransactionCalculatedTaxesPercentage,
      CalculatedTaxesValue: this.buyingTransactionCalculatedTaxesValue,
      CalculatedRetailDiscountPercentage: this.buyingTransactionCalculatedDiscountPercentage,
      CalculatedRetailDiscountValue: this.buyingTransactionCalculatedDiscountValue,
      TaxesPercentageOverInvoice: this.taxesPercentageOverTransaction,
      TaxesValueOverInvoice: this.taxesValueOverTransaction,
      RetailDiscountPercentageOverInvoice: this.retailDiscountPercentageOverTransaction,
      RetailDiscountValueOverInvoice: this.retailDiscountValueOverTransaction,
      Total: this.buyingTransactionTotal,
      UserId: this.user.Id,
      ShiftOwnerId: this.shiftOwner.Id,
      VendorId: this.selectedVendorId,
      NumberOfItems: this.numberOfItems,
      NumberOfPieces: this.numberOfPieces,
      BuyingTransactionItems: this.buyingTransactionItems
    };
  }

  onProcessClick() {
    if (this.checkExpiryDates()) {
      this.openSimpleAlertDialog();
    } else if (this.checkQuantities()) {
      this.openSimpleAlertDialog();
    } else {
      this.buyingTransactionService.postBuyingTransactionTransaction(this.buyingTransactionMaster)
        .then(res => {
          this.resetForm();
        });
    }
  }

  //#endregion

  //#region Validation
  checkExpiryDates(): boolean {
    let result = false;
    let currentDate = new Date();
    this.buyingTransactionItemsDisplay.forEach(item => {
      if (item.ItemExpiryDate.getMonth() == currentDate.getMonth()
        && item.ItemExpiryDate.getFullYear() == currentDate.getFullYear()) {
        this.validationAlertString = 'Expiry date for ' + item.ItemNameEnglish + ' is not suitable !!!';
        return result = true;
      }
    });

    return result;
  }

  checkQuantities(): boolean {
    let result = false;
    this.buyingTransactionItemsDisplay.forEach(item => {
      if (item.BuyingTransactionItemQuantity <= 0) {
        this.validationAlertString = 'Quantity for ' + item.ItemNameEnglish + ' cannot be 0 or less !!!';
        return result = true;
      }
    });

    return result;
  }
  //#endregion


  
  //#region Barcode reader integration


  _lastKeyStrokeTime: number = 0;
  _barcodePickedCharsList: any[] = [];
  _lastItemAddedTime: number = 0;

  scannerResult : string = '';
  scannerResultSubject : BehaviorSubject<string> = new BehaviorSubject('');
  scannerResult$ = this.scannerResultSubject.asObservable();

  @HostListener('window:keydown', ['$event'])
  actOnKeyDown(e: KeyboardEvent){

    //Testing
    //console.log(e.key);
    
    let elapsedTime = e.timeStamp - this._lastKeyStrokeTime;
    //console.log('elapsed time = ' + elapsedTime);
    if(elapsedTime > 100){
      this._barcodePickedCharsList = [];
    }
    this._barcodePickedCharsList.push(e.key);
    this._lastKeyStrokeTime = e.timeStamp;

   
      if(e.key == 'Enter' && this._barcodePickedCharsList.length > 1){

        //remove prefix & suffix
        this._barcodePickedCharsList.pop();
        this._barcodePickedCharsList.splice(0, 1);

        //Testing
        console.log(this._barcodePickedCharsList);
        console.log('last item added at timestamp ' + this._lastItemAddedTime);

        //validate timing between 2 subsequent scans from the reader for protection from misuse errors
        let addItemInterval = this._lastKeyStrokeTime - this._lastItemAddedTime;
        console.log('addItemInterval is ' + addItemInterval);

        //validation and processing
        if(addItemInterval > 100){
          this.scannerResult = this._barcodePickedCharsList.join('');

          //Testing
          console.log('scanner result is ' + this.scannerResult);

          //Triggering the subscription of the behavior subject
          this.scannerResultSubject.next(this.scannerResult);

          this._lastItemAddedTime = this._lastKeyStrokeTime;
        }
        
      }
     
  }



  processScannedBarcode(result : string){
    if(result != ''){
      this.insertedCode = result;

      //Testing
      console.log('subscription worked and the barcode is ' + result);
    }else{
      //Nothing to do now
    }
  }

  //#endregion


  openSimpleAlertDialog() {
    this.dialog.open(SimpleAlertWindowComponent, {
      autoFocus: true,
      width: '50%',
      data: this.validationAlertString
    });
  }

}
