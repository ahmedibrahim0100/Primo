import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor(
    private http : HttpClient
  ) { }

  getAllVendors(){
    return this.http.get(environment.apiURL + '/Vendors/GetAllVendors')
      .toPromise();
  }
}
