import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { User } from '../Models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  //TODO - MOVE VARIABLE TO BE A CONSTRUCTOR PARAMETER
  loggedInUser: User;
  loggedInUserTokenName : string = 'userToken';
  salesManUserTokenName : string = 'salesManUserToken';

  constructor(
    private http : HttpClient
    // @Optional() public loggedInUser: User
    ) { }

  authenticate(userName, password){
    let body : HttpParams = new HttpParams();
    body = body.append('grant_type', 'password');
    body = body.append('username', userName);
    body = body.append('password', password);

    return this.http.post(environment.apiURLforToken + '/token', body).toPromise();
  }

  GetUserInfo(localStorageToken : string){
    var reqHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem(localStorageToken)});
    return this.http.get(environment.apiURL + '/User', { headers: reqHeader })
      .toPromise()
        //.then(res => user = res as User)
        //.then(() => user.Token = localStorage.getItem(localStorageToken));
        //.then(res => this.loggedInUser = res as User)
        //.then(() => this.loggedInUser.Token = localStorage.getItem('userToken'));
       //--------------------------------------------------------------------------------------------
     // .subscribe(res => Object.assign(this.loggedInUser, res));
    //this.loggedInUser.Token = localStorage.getItem('userToken');

    //var response = this.http.get(environment.apiURL + '/User', { headers: reqHeader }).toPromise();
    // this.http.get(environment.apiURL + '/User', { headers: reqHeader })
    //   .subscribe(res => this.loggedInUser = res as User);
    // response.pipe(map(res => Object.assign(this.loggedInUser, res))).toPromise();
    // response.subscribe(res => this.loggedInUser = res as User);
    // return response;
  }

  //For testing some issues
  getLoggedInUser(){
    console.log(this.loggedInUser.Id);
    console.log(this.loggedInUser.Name);
    return this.loggedInUser;
  }
}
