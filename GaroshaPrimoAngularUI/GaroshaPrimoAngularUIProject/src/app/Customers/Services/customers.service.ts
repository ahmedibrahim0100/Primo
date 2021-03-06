import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(
    private http : HttpClient
  ) { }

  getCustomersByIdentifier(identifier){
    let body: HttpParams = new HttpParams();
    body = body.append('identifier', identifier);
    
    return this.http.get(environment.apiURL + '/Customers/GetCustomersByIdentifier', { params: body })
      .toPromise();                                                      
  }
}
