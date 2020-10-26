import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemModel } from '../../Models/item-model.model';
import { ItemsService } from '../../Services/items.service';

@Component({
  selector: 'app-items-selector',
  templateUrl: './items-selector.component.html',
  styleUrls: ['./items-selector.component.css']
})
export class ItemsSelectorComponent implements OnInit {

  selectedItems: ItemModel[];
  @Output()
  gotItems : EventEmitter<ItemModel[]> = new EventEmitter<ItemModel[]>();
  @Output()
  cannotGetItems : EventEmitter<any> = new EventEmitter();

  constructor(private itemsService: ItemsService) { }

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

}
