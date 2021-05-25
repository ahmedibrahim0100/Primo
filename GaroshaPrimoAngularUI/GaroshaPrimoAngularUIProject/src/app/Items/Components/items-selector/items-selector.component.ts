import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ItemModel } from '../../Models/item-model.model';
import { ItemsService } from '../../Services/items.service';

@Component({
  selector: 'app-items-selector',
  templateUrl: './items-selector.component.html',
  styleUrls: ['./items-selector.component.css']
})
export class ItemsSelectorComponent implements OnInit, OnChanges {

  @Input() 
  searchText: string;

  selectedItems: ItemModel[];
  @Output()
  gotItems : EventEmitter<ItemModel[]> = new EventEmitter<ItemModel[]>();
  @Output()
  cannotGetItems : EventEmitter<any> = new EventEmitter();

  constructor(private itemsService: ItemsService) { }

  //OnChanges implementation is inspired by
  //https://dev.to/nickraphael/ngonchanges-best-practice-always-use-simplechanges-always-1feg
  //and
  //https://stackoverflow.com/questions/38974896/call-child-component-method-from-parent-class-angular
  //--Vibhor Dube's answer
  ngOnChanges(changes: SimpleChanges): void {
    for(const propName in changes){
      if(changes.hasOwnProperty(propName)){
        switch (propName){
          case 'searchText':{
            //this.getItemsByIdentifier(this.searchText)
            this.testingFunction();
          }
        }
      }
    }
  }

  ngOnInit(): void {
    
  }

   getItemsByIdentifier(identifier) {

    this.itemsService.getItemsByIdentifier(identifier).then(
      res => {
        if(res)
        this.selectedItems = res as ItemModel[];
        }
    ).then(() => {
      if(this.selectedItems && this.selectedItems.length > 0){
        this.gotItems.emit(this.selectedItems);
      }else{
        this.cannotGetItems.emit();
      }
    });

    // this.selectedItems = await this.itemsService.selectedItems;
    // await this.selectedItems;
    
    // if(this.selectedItems.length > 0){
    //   await this.gotItems.emit(this.selectedItems);
    // }
    
  }

  testingFunction(){
    console.log(this.searchText);
  }

}
