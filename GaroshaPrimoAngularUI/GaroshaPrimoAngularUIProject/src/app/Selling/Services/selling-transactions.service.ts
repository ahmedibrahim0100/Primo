import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
}
