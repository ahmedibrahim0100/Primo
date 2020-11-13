import { Component, OnInit } from '@angular/core';
import { UserService } from '../Authentication/Services/user.service';
import { User } from '../Authentication/Models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoadingUserDataError : boolean = false;
  userInfo: any;
  loggedInUser: User;

  constructor(
    public userService: UserService
   // public loggedInUser: User
    ) { }

  ngOnInit(): void {
    this.getLoggedInUserInfo();
  }

  getLoggedInUserInfo(){
    this.userService.GetUserInfo(localStorage.getItem(this.userService.loggedInUserTokenName))
    .then(() => {
      console.log(this.userService.loggedInUser.Name);
      console.log(this.userService.loggedInUser.Email);
      console.log(this.userService.loggedInUser.CreatedDate);
      console.log(this.userService.loggedInUser.Id);
      console.log(this.userService.loggedInUser.Status);
    })
    // .then(() => {
    //   this.loggedInUser = {
    //     Id : this.userService.loggedInUser.Id,
    //     Name : this.userService.loggedInUser.Name,
    //     Email : this.userService.loggedInUser.Email,
    //     CreatedDate : this.userService.loggedInUser.CreatedDate,
    //     Status : this.userService.loggedInUser.Status,
    //     Token : localStorage.getItem('userToken')
    //   };  
    // })
    .catch(
    (err: HttpErrorResponse) => {
      this.isLoadingUserDataError = true;
    });
    // this.userService.GetLoggedInUserInfo();
    // this.loggedInUser = this.userService.loggedInUser;
    // .subscribe((data: any) => {
    //   this.loggedInUser = data as User;
    }
}
