import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SellingTransactionMasterData } from '../Models/selling-transaction-master-data.model';

@Injectable({
  providedIn: 'root'
})
export class SellingTransactionsService {

  constructor(
    private http : HttpClient
  ) { }

  getAllSellingTransactionTypes(){
    return this.http.get(environment.apiURL + '/SellingTransactions/GetAllSellingTransactionTypes')
      .toPromise();
  }

  postSellingTransaction(sellingTransaction : SellingTransactionMasterData){
    let sellingTransactionJson = JSON.stringify(sellingTransaction);
    console.log(sellingTransactionJson);
    return this.http.post(environment.apiURL + '/SellingTransactions/PostSale', 
    sellingTransaction
    )
      .toPromise();
  }
}
