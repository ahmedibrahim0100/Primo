import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../Models/user.model';
import { UserService } from '../../Services/user.service';

@Component({
  selector: 'app-assign-user',
  templateUrl: './assign-user.component.html',
  styleUrls: ['./assign-user.component.css']
})
export class AssignUserComponent implements OnInit {

  isSigninError: boolean = false;
  assignedUser: User = new User();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<AssignUserComponent>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(username, password) {
    this.userService.authenticate(username, password)
      .then((data: any) =>
        localStorage.setItem(this.userService.salesManUserTokenName, data.access_token))
      .then(() => 
        this.userService.GetUserInfo(this.userService.salesManUserTokenName)
          .then(result => this.assignedUser = result as User)
            .then(() => this.assignedUser.Token = localStorage.getItem(this.userService.salesManUserTokenName))
              .then(() => this.dialogRef.close(this.assignedUser))
      )
      .catch(
        (err: HttpErrorResponse) => {
          this.isSigninError = true;
        }
      );
  }
}
