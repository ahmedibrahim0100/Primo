import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { User } from '../Models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedInUser: User = new User();

  constructor(
    private http : HttpClient
    // @Optional() public loggedInUser: User
    ) { }

  authenticate(userName, password){
    let body : HttpParams = new HttpParams();
    body = body.append('grant_type', 'password');
    body = body.append('username', userName);
    body = body.append('password', password);

    return this.http.post(environment.apiURLforToken + '/token', body);
  }

  GetLoggedInUserInfo(){
    var reqHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')});
    this.http.get(environment.apiURL + '/User', { headers: reqHeader })
      .subscribe(res => Object.assign(this.loggedInUser, res));
    this.loggedInUser.Token = localStorage.getItem('userToken');
    
    //var response = this.http.get(environment.apiURL + '/User', { headers: reqHeader }).toPromise();
    // this.http.get(environment.apiURL + '/User', { headers: reqHeader })
    //   .subscribe(res => this.loggedInUser = res as User);
    // response.pipe(map(res => Object.assign(this.loggedInUser, res))).toPromise();
    // response.subscribe(res => this.loggedInUser = res as User);
    // return response;
  }
}
