import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/Ingredients/Models/ingredient.model';
import { IngredientsService } from 'src/app/Ingredients/Services/ingredients.service';
import { ProducerCompany } from 'src/app/ProducerCompanies/Models/producer-company.model';
import { ProducerCompaniesService } from 'src/app/ProducerCompanies/Services/producer-companies.service';
import { TherapeuticClass } from 'src/app/TherapeuticClasses/Models/therapeutic-class.model';
import { TherapeuticClassesService } from 'src/app/TherapeuticClasses/Services/therapeutic-classes.service';
import { NewItemModel } from '../../Models/new-item-model.model';
import { ItemsService } from '../../Services/items.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

    itemNameEnglish: string;
    itemOtherName: string;
    producerCompanyId: number;
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
    scannerPickedBarcode : string;

    itemCodes: string[];
    
    ingredientsIds: number[];

    
    
    

  constructor(
    private itemsService : ItemsService,
    private producerCompaniesService : ProducerCompaniesService,
    private therapeuticClassesService : TherapeuticClassesService,
    private ingredientsService : IngredientsService
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

  public set scannerResult(v : string) {
    this.insertedCode = v;
    console.log('setter worked');
  }
  
  //scannerResult : string = '';

  @HostListener('window:keydown', ['$event'])
  actOnKeyDown(e: KeyboardEvent){
    console.log(e.key);
    
    let elapsedTime = e.timeStamp - this._lastKeyStrokeTime;
    console.log('elapsed time = ' + elapsedTime);
    if(elapsedTime > 100){
      this._barcodePickedCharsList = [];
    }
    this._barcodePickedCharsList.push(e.key);
    this._lastKeyStrokeTime = e.timeStamp;

    //let addItemInterval = this._lastKeyStrokeTime - this._lastItemAddedTime;

    //if(addItemInterval > 100){
      if(e.key == 'Enter' && this._barcodePickedCharsList.length > 1){
        console.log('if is true');
        this._barcodePickedCharsList.pop();
        //this._barcodePickedCharsList.splice(this._barcodePickedCharsList.length - 2, 2);
        this._barcodePickedCharsList.splice(0, 1);
        console.log(this._barcodePickedCharsList);
        console.log('last item added at timestamp ' + this._lastItemAddedTime);
        let addItemInterval = this._lastKeyStrokeTime - this._lastItemAddedTime;
        console.log('addItemInterval is ' + addItemInterval);
        if(addItemInterval > 100){
          this.scannerResult = this._barcodePickedCharsList.join('');
          console.log('scanner result is ' + this.scannerResult);
          this._lastItemAddedTime = this._lastKeyStrokeTime;
        }
        
      }
     
  }

  addScannedBarcodeToList(){
    console.log('function fired');
    this.insertedCode = this.scannerResult;
    this.itemCodes.push(this.scannerPickedBarcode);
  }

}
