import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-item-repetition-error',
  templateUrl: './new-item-repetition-error.component.html',
  styleUrls: ['./new-item-repetition-error.component.css']
})
export class NewItemRepetitionErrorComponent implements OnInit {

  public message : string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef : MatDialogRef<NewItemRepetitionErrorComponent>
    
  ) { }

  ngOnInit(): void {
    this.message = this.data;
    console.log(this.data);
  }

  // processDialogMessage(){
  //   if(this.data.key == 'ItemCodes'){
  //     this.message = 'The item : ' + this.data.Value.repeatedItem.ItemNameEnglish + 
  //     ' has the barcode : ' + this.data.Value.repeatedCode;
  //   }else if(this.data.key == 'ItemNameEnglish'){
  //     this.message = 'The item : ' + this.data.Value.ItemNameEnglish + 
  //     ' has the same english name : ' + this.data.Value.ItemNameEnglish;
  //   }else if(this.data.key == 'ItemOtherName'){
  //     this.message = 'The item : ' + this.data.Value.ItemOtherName + 
  //     ' has the same other name : ' + this.data.Value.ItemOtherName;
  //   }
  // }

  close(){
    this.dialogRef.close();
  }

}
