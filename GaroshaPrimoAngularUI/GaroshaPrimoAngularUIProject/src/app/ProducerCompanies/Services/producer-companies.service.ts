import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProducerCompaniesService {

  constructor(
    private http : HttpClient
  ) { }

  
  getAllProducerCompanies(){
    return this.http.get(environment.apiURL + '/ProducerCompanies/GetAllProducerCompanies')
      .toPromise();
  }
}
