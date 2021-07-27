import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor(
    private http : HttpClient
  ) { }

  getAllIngredients(){
    return this.http.get(environment.apiURL + '/Ingredients/GetAllIngredients').toPromise();
  }
}
