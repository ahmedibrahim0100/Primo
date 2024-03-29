import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from 'src/app/Ingredients/Models/ingredient.model';
import { IngredientsService } from 'src/app/Ingredients/Services/ingredients.service';
import { ProducerCompany } from 'src/app/ProducerCompanies/Models/producer-company.model';
import { ProducerCompaniesService } from 'src/app/ProducerCompanies/Services/producer-companies.service';
import { SimpleAlertWindowComponent } from 'src/app/SharedTools/simple-alert-window/simple-alert-window.component';
import { TherapeuticClass } from 'src/app/TherapeuticClasses/Models/therapeutic-class.model';
import { TherapeuticClassesService } from 'src/app/TherapeuticClasses/Services/therapeutic-classes.service';
import { NewItemModel } from '../../Models/new-item-model.model';
import { NewItemVerificationModel } from '../../Models/new-item-verification-model.model';
import { ItemsService } from '../../Services/items.service';
import { NewItemRepetitionErrorComponent } from '../new-item-repetition-error/new-item-repetition-error.component';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

    itemNameEnglish: string;
    itemOtherName: string;
    producingCompanyId: number;
    itemSellingPrice: number;
    itemBuyingDiscountPercentage: number;
    itemBuyingPrice: number;
    taxesPercentageOnBuying: number;
    taxesValueOnBuying: number;
    taxesPercentageOnSelling: number;
    taxesValueOnSelling: number;
    itemDescription: string;
    itemStatus: string;

    allProducerCompanies : ProducerCompany[];

    allTherapeuticClasses : TherapeuticClass[];
    selectedTherapeuticClass : TherapeuticClass;
    selectedTherapeuticClasses: TherapeuticClass[];

    allIngredients : Ingredient[];
    selectedIngredient : Ingredient;
    selectedIngredients : Ingredient[];

    insertedCode : string;
    itemCodes: string[];

    successString : string = 'Item saved successfully';
    repetitionErrorString : string = '';


  constructor(
    private itemsService : ItemsService,
    private producerCompaniesService : ProducerCompaniesService,
    private therapeuticClassesService : TherapeuticClassesService,
    private ingredientsService : IngredientsService,
    private dialog : MatDialog
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  resetForm(form? : NgForm){
    if(form = null) 
      form.resetForm();
    
    this.producerCompaniesService.getAllProducerCompanies()
      .then(res => this.allProducerCompanies = res as ProducerCompany[]);

    this.therapeuticClassesService.getAllTherapeuticClasses()
      .then(res => this.allTherapeuticClasses = res as TherapeuticClass[]);

    this.ingredientsService.getAllIngredients()
      .then(res => this.allIngredients = res as Ingredient[]);

    this.selectedTherapeuticClasses = [];
    this.selectedIngredients = [];
    this.itemCodes = [];

    this.itemNameEnglish = '';
    this.itemOtherName = '';
    this.producingCompanyId = 1;
    this.itemSellingPrice = 0;
    this.itemBuyingDiscountPercentage = 0;
    this.itemBuyingPrice = 0;
    this.taxesPercentageOnBuying = 0;
    this.taxesValueOnBuying = 0;
    this.taxesPercentageOnSelling = 0;
    this.taxesValueOnSelling = 0;
    this.itemDescription = '';
    this.itemStatus = '';
    this.insertedCode = '';
    this.repetitionErrorString = '';
    
    this.scannerResult$.subscribe(res => this.processScannedBarcode(res));
    //this.therapeuticClassesIds = [];
    //this.ingredientsIds = [];
  }

  confirmAddition(x, _arr){
    _arr.push(x);
  }

  deleteFromCollection(x, _arr){
    _arr.splice(x, 1);
  }

  _lastKeyStrokeTime : number = 0;
  _barcodePickedCharsList : any[] = [];
  _lastItemAddedTime : number = 0;

  // public set scannerResult(v : string) {
  //   this.insertedCode = v;
  //   console.log('setter worked');
  // }
  
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

  // addScannedBarcodeToList(){
  //   console.log('function fired');
  //   this.insertedCode = this.scannerResult;
  //   this.itemCodes.push(this.scannerPickedBarcode);
  // }

  processScannedBarcode(result : string){
    if(result != ''){
      this.insertedCode = result;

      //Testing
      console.log('subscription worked and the barcode is ' + result);
    }else{
      //Nothing to do now
    }
  }

  saveNewItem(){
    if(this.itemNameEnglish != ''){
      let newItem : NewItemModel = {
        ItemNameEnglish : this.itemNameEnglish,
        ItemOtherName : this.itemOtherName,
        ProducerCompanyId : this.producingCompanyId,
        ItemSellingPrice : this.itemSellingPrice,
        ItemBuyingDiscountPercentage : this.itemBuyingDiscountPercentage,
        ItemBuyingPrice : this.itemBuyingPrice,
        TaxesPercentageOnBuying : this.taxesPercentageOnBuying,
        TaxesValueOnBuying : this.taxesValueOnBuying,
        TaxesPercentageOnSelling : this.taxesPercentageOnSelling,
        TaxesValueOnSelling : this.taxesValueOnSelling,
        ItemDescription : this.itemDescription,
        ItemStatus : '',
        ItemCodes : this.itemCodes,
        TherapeuticClassesIds : this.selectedTherapeuticClasses
          .map(therapeuticClass => therapeuticClass.Id),
        IngredientsIds : this.selectedIngredients.map(ingredient => ingredient.Id)
      };
  
      let verificationData : NewItemVerificationModel = {
        ItemNameEnglish : newItem.ItemNameEnglish,
        ItemOtherName : newItem.ItemOtherName,
        ItemCodes : newItem.ItemCodes
      };
  
      this.itemsService.verifyNewItem(verificationData).then((data : any) => {
        if(data == true){
          //console.log('verification done with' + data);
          this.itemsService.postNewItem(newItem)
            .then((res) => {
              this.dialog.open(SimpleAlertWindowComponent, {
                autoFocus : true,
                width : '50%',
                data : this.successString
              }).afterClosed()
                .subscribe(() => {
                  this.resetForm();
                });    
        });
        }else{
          // console.log(data);
          // console.log(data.Key);
          this.repetitionErrorString = this.processDialogMessage(data);
          //console.log('repetition message is ' + this.repetitionErrorString);
          this.dialog.open(NewItemRepetitionErrorComponent, {
            autoFocus : true,
            width : '50%',
            data : this.repetitionErrorString
          });
        }
      }  
      );
    }
    
  }

  processDialogMessage(data : any) : string {
    //console.log('processdialogmessage fired ' + data.Key);
    let message : string;
    if(data.Key === 'ItemCodes'){
      console.log('Item code is repeated !!!!!!');
      message = 'The item: ' + data.Value.repeatedItem.ItemNameEnglish + 
      ' has the barcode: ' + data.Value.repeatedCode;
      console.log(message);
    }else if(data.Key === 'ItemNameEnglish'){
      message = 'The item: ' + data.Value.ItemNameEnglish + 
      ' has the same english name: ' + data.Value.ItemNameEnglish;
    }else if(data.Key === 'ItemOtherName'){
      message = 'The item: ' + data.Value.ItemOtherName + 
      ' has the same other name: ' + data.Value.ItemOtherName;
    }

    return message;
  }

}
