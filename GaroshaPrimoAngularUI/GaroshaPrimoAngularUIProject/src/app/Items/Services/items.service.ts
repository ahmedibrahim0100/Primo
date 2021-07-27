import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ItemModel } from '../Models/item-model.model';
import { environment } from 'src/environments/environment';
import { NewItemModel } from '../Models/new-item-model.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  itemsList: ItemModel[];
  //selectedItems: ItemModel[];

  constructor(
    private http: HttpClient
  ) { }

  getAllItems() {
    // var reqHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')});
    this.itemsList  = new Array<ItemModel>();
    this.http.get(environment.apiURL + '/Items')
      .subscribe(res => Object.assign(this.itemsList, res));
  }

  getItemsByIdentifier(identifier){
    let body: HttpParams = new HttpParams();
    body = body.append('identifier', identifier);
    //this.selectedItems = new Array<ItemModel>();
    return this.http.get(environment.apiURL + '/Items/GetItemsByIdentifier', { params: body })
      .toPromise()
      //.then(res => Object.assign(this.selectedItems, res));

      //.subscribe(res => Object.assign(this.selectedItems, res));     
  }

  postNewItem(newItem : NewItemModel){
    return this.http.post(environment.apiURL + '/Items/AddNewItem',
    newItem).toPromise();
  }
}
