import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
    this.userService.authenticate(userName, password)
      .then((data : any) => 
        localStorage.setItem(this.userService.loggedInUserToken, data.access_token))
        .then(() => {
          this.userService.GetUserInfo(this.userService.loggedInUser, this.userService.loggedInUserToken)
          .then(() => 
            this.router.navigate(['/selling-invoice']) 
          )
        })
        
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
    (err : HttpErrorResponse) => {
      this.isSigninError = true;
    }
    );
  }

}
