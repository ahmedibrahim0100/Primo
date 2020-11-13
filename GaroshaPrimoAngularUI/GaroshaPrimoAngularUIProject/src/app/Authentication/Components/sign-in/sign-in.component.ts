import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../Models/user.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isSigninError : boolean = false;

  constructor(
    private userService : UserService,
    private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit(userName, password){
    // debugger;
    this.userService.authenticate(userName, password)
      .then(
        (data : any) => localStorage.setItem(this.userService.loggedInUserTokenName, data.access_token))
        .then(() => this.userService.GetUserInfo(this.userService.loggedInUserTokenName)
          .then(result => this.userService.loggedInUser = result as User)
            .then(() => this.userService.loggedInUser.Token = localStorage.getItem(this.userService.loggedInUserTokenName))
              .then(() => this.router.navigate(['/selling-invoice']))
              )
        //---------------------------------------------------------------------------------------
        //.then(() => console.log(this.userService.loggedInUser)
        //)
        //.then(() => this.router.navigate(['/home']))
        
      //.subscribe((data : any) => {
      //localStorage.setItem('userToken', data.access_token);
      //this.userService.GetLoggedInUserInfo();
      //this.router.navigate(['/home']);
    //},
    .catch(
    (err : HttpErrorResponse) =>  this.isSigninError = true);
  }

}
