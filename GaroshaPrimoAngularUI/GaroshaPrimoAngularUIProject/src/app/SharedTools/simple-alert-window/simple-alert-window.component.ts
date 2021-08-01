import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-alert-window',
  templateUrl: './simple-alert-window.component.html',
  styleUrls: ['./simple-alert-window.component.css']
})
export class SimpleAlertWindowComponent implements OnInit {

  public message : string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef : MatDialogRef<SimpleAlertWindowComponent>
    
  ) { }

  ngOnInit(): void {
    this.message = this.data;
  }

  close(){
    this.dialogRef.close();
  }

}
