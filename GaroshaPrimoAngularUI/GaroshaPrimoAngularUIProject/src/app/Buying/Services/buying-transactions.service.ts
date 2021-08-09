import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BuyingTransactionMasterData } from '../Models/buying-transaction-master-data.model';

@Injectable({
  providedIn: 'root'
})
export class BuyingTransactionsService {

  constructor(
    private http : HttpClient
  ) { }

  postBuyingTransactionTransaction(buyingTransaction : BuyingTransactionMasterData){
    //let sellingTransactionJson = JSON.stringify(sellingTransaction);
    //console.log(sellingTransactionJson);
    return this.http.post(environment.apiURL + '/BuyingTransactions/PostBuyingTransaction', 
    buyingTransaction
    )
      .toPromise();
  }
}
