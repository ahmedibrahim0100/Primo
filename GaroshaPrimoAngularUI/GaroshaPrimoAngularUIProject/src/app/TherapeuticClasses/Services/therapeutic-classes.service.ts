import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TherapeuticClassesService {

  constructor(
    private http : HttpClient
  ) { }

  getAllTherapeuticClasses(){
    return this.http.get(environment.apiURL + '/TherapeuticClasses/GetAllTherapeuticClasses')
      .toPromise();
  }
}
