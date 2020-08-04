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

  // isLoadingUserDataError : boolean = false;
  // userInfo: any;
  loggedInUser: User;

  constructor(
    public userService: UserService
    // public loggedInUser: User
    ) { }

  ngOnInit(): void {
    this.getLoggedInUserInfo();
  }

  getLoggedInUserInfo(){
    // this.userService.GetLoggedInUserInfo().subscribe((data: any) => {
    //   this.loggedInUser.Id = data.Id;
    //   this.loggedInUser.Name = data.Name;
    //   this.loggedInUser.Email = data.Email;
    //   this.loggedInUser.CreatedDate = data.CreatedDate;
    //   this.loggedInUser.Status = data.Status;
    //   this.loggedInUser.Token = localStorage.getItem('userToken');
    // },
    // (err: HttpErrorResponse) => {
    //   this.isLoadingUserDataError = true;
    // });
    this.userService.GetLoggedInUserInfo();
    this.loggedInUser = this.userService.loggedInUser;
    //.subscribe((data: any) => {
      //this.loggedInUser = data as User;
    //});
  }



}
