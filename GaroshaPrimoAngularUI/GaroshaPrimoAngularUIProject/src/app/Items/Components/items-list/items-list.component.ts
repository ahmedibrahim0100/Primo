import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../Services/items.service';
import { ItemModel } from '../../Models/item-model.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {

  itemsList: ItemModel[];

  constructor(
    private itemsService: ItemsService
    ) { }

  ngOnInit(): void {
    this.getAllItems();
  }

  getAllItems(){
    this.itemsService.getAllItems();
    this.itemsList = this.itemsService.itemsList;
  }

}
